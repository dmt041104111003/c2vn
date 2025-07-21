import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/app/api/auth/[...nextauth]/route';

function getYoutubeIdFromUrl(url: string) {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/#\s]{11})/);
  return match ? match[1] : '';
}

export async function GET(request: NextRequest) {
  const isPublic = request.nextUrl?.searchParams?.get('public') === '1';
  try {
    if (isPublic) {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          createdAt: true,
          status: true,
          author: { select: { name: true } },
          media: { select: { url: true, type: true, id: true } },
        },
      });
      const mapped = posts.map(p => ({
        ...p,
        slug: p.id,
        author: p.author?.name || 'Admin',
        media: Array.isArray(p.media)
          ? p.media.map((m: any) =>
              m.type === 'YOUTUBE'
                ? { ...m, id: m.id && m.id.length === 11 ? m.id : getYoutubeIdFromUrl(m.url) }
                : m
            )
          : [],
      }));
      return NextResponse.json({ posts: mapped });
    }
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        shares: true,
        createdAt: true,
        updatedAt: true,
        comments_rel: { select: { id: true } },
        reactions: { select: { type: true } },
        author: { select: { name: true } },
        tags: { select: { tag: { select: { id: true, name: true } } } },
      },
    });
    const mapped = posts.map(post => {
      const reactionCount: Record<string, number> = {};
      for (const r of post.reactions) {
        reactionCount[r.type] = (reactionCount[r.type] || 0) + 1;
      }
      return {
        id: post.id,
        title: post.title,
        status: post.status,
        shares: post.shares,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        comments: post.comments_rel.length,
        author: post.author?.name || 'Admin',
        tags: post.tags?.map(t => t.tag) || [],
        ...reactionCount,
      };
    });
    return NextResponse.json({ posts: mapped });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
    const { title, content, excerpt, status, tags, media, createdAt, updatedAt } = body;
    if (!title || !content || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    let tagIds: string[] = [];
    if (Array.isArray(tags) && tags.length > 0) {
      const foundTags = await prisma.tag.findMany({ where: { name: { in: tags } } });
      tagIds = foundTags.map(t => t.id);
    }
    const data: any = {
      title,
      content,
      excerpt,
      status,
      authorId: currentUser.id,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
    };
    if (Array.isArray(media) && media.length > 0) {
      data.media = { create: media.map((m: any) => ({ url: m.url, type: m.type })) };
    }
    if (tagIds.length > 0) {
      data.tags = { create: tagIds.map(tagId => ({ tagId })) };
    }
    console.log('DEBUG POST DATA:', JSON.stringify(data, null, 2));
    try {
      const post = await prisma.post.create({ data });
      return NextResponse.json({ post });
    } catch (err) {
      console.error('PRISMA CREATE ERROR:', err?.message || err);
      return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
    }
  } catch (error) {
    console.error('POST /api/admin/posts error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}