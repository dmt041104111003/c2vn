import { NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: { created_at: "desc" },
  });
  return NextResponse.json(tags);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.name || !data.slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  }

  const newTag = await prisma.tag.create({
    data: {
      name: data.name,
      slug: data.slug,
    },
  });
  return NextResponse.json(newTag);
}
