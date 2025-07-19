/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/media/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const mediaList = await prisma.media.findMany({
      orderBy: {
        uploadedAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Media files fetched successfully",
      data: mediaList,
    });
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { url, type, name, size, uploaded_by } = body;

    if (!url || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMedia = await prisma.media.create({
      data: {
        url,
        type,
        name,
        size,
        uploaded_by,
      },
    });

    return NextResponse.json({
      message: "Media file uploaded successfully",
      data: newMedia,
    });
  } catch (error) {
    console.error("POST /api/media error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
