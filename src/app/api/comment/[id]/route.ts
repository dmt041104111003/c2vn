import { NextResponse } from "next/server";
import {prisma} from "~/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();

  if (!data.content) {
    return NextResponse.json({ error: "content là bắt buộc" }, { status: 400 });
  }

  const updatedComment = await prisma.comment.update({
    where: { id: params.id },
    data: {
      content: data.content,
      is_approved: data.is_approved ?? undefined,
    },
  });

  return NextResponse.json(updatedComment);
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await prisma.comment.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: "Comment đã được xóa" });
}