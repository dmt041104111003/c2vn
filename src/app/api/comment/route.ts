import { NextResponse } from "next/server";
import {prisma} from "~/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.post_id || !data.content) {
    return NextResponse.json({ error: "post_id và content là bắt buộc" }, { status: 400 });
  }

  const newComment = await prisma.comment.create({
    data: {
      post_id: data.post_id,
      user_id: data.user_id ?? null,
      content: data.content,
      parent_comment_id: data.parent_comment_id ?? null,
      is_approved: false,
    },
  });

  return NextResponse.json(newComment);
}
