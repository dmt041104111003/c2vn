import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';

function getYoutubeIdFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/#\s]{11})/);
  return match ? match[1] : '';
}

export async function GET(request: NextRequest, context: any) {
  const params = await context.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        author: { select: { name: true } },
        media: { select: { url: true, type: true, id: true } },
        tags: { select: { tag: { select: { id: true, name: true } } } },
        shares: true,
      },
    });
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const tags = post.tags?.map((t: any) => t.tag) || [];
    let media = Array.isArray(post.media) ? post.media : [];
    media = media.map((m: any) =>
      m.type === 'YOUTUBE'
        ? { ...m, id: m.id && m.id.length === 11 ? m.id : getYoutubeIdFromUrl(m.url) }
        : m
    );
    return NextResponse.json({ post: { ...post, author: post.author?.name || 'Admin', tags, media } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.address) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const currentUser = await prisma.user.findUnique({
      where: { wallet: session.user.address },
      include: { role: true },
    });
    if (!currentUser || String(currentUser.role.name).toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: any) {
  const params = await context.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.address) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const currentUser = await prisma.user.findUnique({
      where: { wallet: session.user.address },
      include: { role: true },
    });
    if (!currentUser || String(currentUser.role.name).toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    if (!body.title || !body.content || !body.status || !body.tags || !body.media) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('PATCH params:', params);
    console.log('PATCH body:', body);
    const isUUID = (str: string) => /^[0-9a-fA-F-]{36}$/.test(str);

    let tagIds: string[] = [];
    if (body.tags && body.tags.length > 0) {
      if (isUUID(body.tags[0])) {
        tagIds = body.tags;
      } else {
        const tags = await prisma.tag.findMany({
          where: { name: { in: body.tags } },
          select: { id: true }
        });
        tagIds = tags.map(t => t.id);
      }
    }
    await prisma.postTag.deleteMany({
      where: { postId: params.id }
    });
    if (tagIds.length > 0) {
      await prisma.postTag.createMany({
        data: tagIds.map((tagId: string) => ({
          postId: params.id,
          tagId,
        })),
        skipDuplicates: true,
      });
    }

    try {
      await prisma.media.deleteMany({ where: { postId: params.id } });
      if (Array.isArray(body.media) && body.media.length > 0) {
        await prisma.media.createMany({
          data: body.media.map((m: any) => ({
            id: m.id,
            url: m.url,
            type: m.type,
            postId: params.id,
          })),
          skipDuplicates: true,
        });
      }
      const updated = await prisma.post.update({
        where: { id: params.id },
        data: {
          title: body.title,
          content: body.content,
          status: body.status,
        },
        include: {
          tags: { include: { tag: true } },
          media: true,
        },
      });
      return NextResponse.json({ post: updated });
    } catch (err: any) {
      console.error('Prisma update error:', err);
      return NextResponse.json({ error: err.message || 'Prisma error' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('PATCH outer error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
} 