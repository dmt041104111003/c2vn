import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } },
      comments: { include: { user: true } },
      likes: true,
    },
  });
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();

  const updatedPost = await prisma.post.update({
    where: { id: params.id },
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      summary: data.summary,
      thumbnail_url: data.thumbnail_url,
      video_url: data.video_url,
      status: data.status,
      author_id: data.author_id,
      category_id: data.category_id,
      published_at: data.published_at ? new Date(data.published_at) : null,
      scheduled_at: data.scheduled_at ? new Date(data.scheduled_at) : null,
      updated_at: new Date(),
      tags: {
        deleteMany: {},
        create: data.tags
          ? data.tags.map((tagId: string) => ({
              tag: { connect: { id: tagId } },
            }))
          : [],
      },
    },
    include: {
      tags: true,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Post deleted" });
}
