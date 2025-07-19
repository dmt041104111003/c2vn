/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";


export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    
    const permissions = await prisma.permission.findMany();
    return NextResponse.json({
        message: "Permissions fetched successfully",
        data: permissions
        })

  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch permissions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { action, description } = await request.json();
    const permission = await prisma.permission.create({
      data: { action, description },
    });
    return NextResponse.json({
        message: "Permissions created successfully",
        data: permission
        })
  } catch (err) {
    return NextResponse.json({ error: "Failed to create permission" }, { status: 500 });
  }
}



