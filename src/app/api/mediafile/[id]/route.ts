import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

type Context = {
  params: Promise<{ id: string }> | { id: string };
};

export async function GET(req: NextRequest, context: Context): Promise<NextResponse> {
 
  const { id } = await context.params;

  try {
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(media);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, context: Context): Promise<NextResponse> {
 
  const { id } = await context.params;

  try {
    const body = await req.json();
    const { url, type, name, size, uploaded_by } = body;

    const updated = await prisma.media.update({
      where: { id },
      data: { url, type, name, size, uploaded_by },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context): Promise<NextResponse> {

  const { id } = await context.params;

  try {
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
