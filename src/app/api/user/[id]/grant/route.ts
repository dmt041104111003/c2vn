/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/users/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  let body: { roleIds?: string[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { roleIds } = body;

  if (!roleIds || !Array.isArray(roleIds)) {
    return NextResponse.json({ error: "Missing or invalid roleIds" }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          set: [], 
          connect: roleIds.map((roleId) => ({ id: roleId })),
        },
      },
      include: {
        roles: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Update roles error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
