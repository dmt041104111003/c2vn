/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    const address = session?.user?.address;

    if (!address) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { wallet: address },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
        address: user.wallet,
        role: user.role.name,
        isAdmin: user.role.name === "ADMIN",
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    const address = session?.user?.address;

    if (!address) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image, dob, phone, hometown } = body;

    const user = await prisma.user.findUnique({
      where: { wallet: address },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { wallet: address },
      data: {
        name,
        image,
        dob,
        phone,
        hometown,
      },
      include: { role: true },
    });

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        image: updatedUser.image,
        address: updatedUser.wallet,
        role: updatedUser.role.name,
        isAdmin: updatedUser.role.name === "ADMIN",
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
