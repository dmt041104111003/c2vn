/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "~/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();

  if (!data.name || !data.slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
      },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: "Category not found or update failed" }, { status: 404 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Category not found or delete failed" }, { status: 404 });
  }
}