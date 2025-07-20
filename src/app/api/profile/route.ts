import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    return NextResponse.json({ profile: user?.profile || null });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, dob, phone, hometown } = body;

    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { roles: true },
    });
    if (user && user.roles.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    } else {
      await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || null,
          image: session.user.image || null,
        },
      });

      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { roles: true },
      });
    }

    if (!user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    if (user.roles.length === 0) {
      const userRole = await prisma.role.findFirst({ where: { name: "USER" } });

      if (userRole) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            roles: {
              connect: { id: userRole.id },
            },
          },
        });
      }
    }

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: { name, dob, phone, hometown },
      create: { userId: user.id, name, dob, phone, hometown },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
