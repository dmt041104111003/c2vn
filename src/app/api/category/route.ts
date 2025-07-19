import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { created_at: "desc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }

  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
    },
  });
  return NextResponse.json(newCategory);
}
