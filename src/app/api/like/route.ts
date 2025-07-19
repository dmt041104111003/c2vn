import { NextResponse } from "next/server";
import {prisma} from "~/lib/prisma";

export async function POST(request: Request) {
  const { user_id, post_id } = await request.json();

  if (!user_id || !post_id) {
    return NextResponse.json({ error: "user_id and post_id are required" }, { status: 400 });
  }

  const existingLike = await prisma.like.findUnique({
    where: { user_id_post_id: { user_id, post_id } },
  });

  if (existingLike) {

    await prisma.like.delete({
      where: { user_id_post_id: { user_id, post_id } },
    });
    return NextResponse.json({ message: "Unliked" });
  } else {
  
    const newLike = await prisma.like.create({
      data: {
        user_id,
        post_id,
      },
    });
    return NextResponse.json(newLike);
  }
}
