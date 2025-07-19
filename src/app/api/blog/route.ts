/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "10");
  const status = url.searchParams.get("status"); 
  const category = url.searchParams.get("category"); 
  const authorId = url.searchParams.get("authorId"); 

  const where: any = {};
  if (status) where.status = status;
  if (category) where.category_id = category;
  if (authorId) where.author_id = authorId;

  const posts = await prisma.post.findMany({
    where,
    orderBy: { created_at: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } },
      comments: true,
      likes: true,
    },
  });

  const total = await prisma.post.count({ where });

  return NextResponse.json({
    data: posts,
    meta: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

export async function POST(request: Request) {
  const data = await request.json();



  const newPost = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      content: data.content,
      summary: data.summary,
      thumbnail_url: data.thumbnail_url,
      video_url: data.video_url,
      status: data.status ?? "draft",
      author_id: data.author_id,
      category_id: data.category_id,
      published_at: data.published_at ? new Date(data.published_at) : null,
      scheduled_at: data.scheduled_at ? new Date(data.scheduled_at) : null,
      tags: data.tags
        ? {
            create: data.tags.map((tagId: string) => ({
              tag: { connect: { id: tagId } },
            })),
          }
        : undefined,
    },
    include: {
      tags: true,
    },
  });

  return NextResponse.json(newPost);
}
