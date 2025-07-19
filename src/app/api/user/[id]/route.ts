import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        roles: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const result = {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile,
      roles: user.roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        is_default: role.is_default,
        permissions: role.permissions.map((rp) => ({
          id: rp.permission.id,
          action: rp.permission.action,
          description: rp.permission.description,
        })),
      })),
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET user error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { email, name, image, dob, phone, hometown } = body;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        email,
        name,
        image,
      },
    });

    const profile = await prisma.profile.upsert({
      where: { userId: params.id },
      update: { name, dob, phone, hometown },
      create: { userId: params.id, name, dob, phone, hometown },
    });

    return NextResponse.json({ user: updatedUser, profile });
  } catch (err) {
    console.error("PUT user error:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.profile.deleteMany({ where: { userId: params.id } });

    const deletedUser = await prisma.user.delete({ where: { id: params.id } });

    return NextResponse.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (err) {
    console.error("DELETE user error:", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
