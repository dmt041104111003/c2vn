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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userSession = await prisma.session.findFirst({
      where: { userId: user.id },
      orderBy: { lastAccess: "desc" },
    });

    if (!userSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      session: {
        id: userSession.id,
        accessTime: userSession.accessTime,
        lastAccess: userSession.lastAccess,
      }
    });
  } catch (error) {
    console.error("Error fetching session info:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 