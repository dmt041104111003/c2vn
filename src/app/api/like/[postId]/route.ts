import { NextResponse } from "next/server";
import {prisma} from "~/lib/prisma";

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const postId = params.postId;
  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  const likeCount = await prisma.like.count({
    where: { post_id: postId },
  });

  return NextResponse.json({ postId, likeCount });
}
