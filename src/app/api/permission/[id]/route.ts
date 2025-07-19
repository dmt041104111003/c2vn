/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function PUT(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = context.params;
    const { action, description } = await request.json();
    const permission = await prisma.permission.update({
      where: { id },
      data: { action, description },
    });
    return NextResponse.json({
        message: "Permissions updated successfully",
        data: permission
        })
  } catch (err) {
    return NextResponse.json({ error: "Failed to update permission" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = context.params;
    const permission = await prisma.permission.delete({ where: { id } });
    return NextResponse.json({ message: "Permission deleted successfully", permission });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete permission" }, { status: 500 });
  }
}
