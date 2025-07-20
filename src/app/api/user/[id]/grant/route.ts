/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  const params = await (context.params instanceof Promise ? context.params : Promise.resolve(context.params));
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

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
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Update roles error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
