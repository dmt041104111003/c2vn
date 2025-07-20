import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prisma";

export async function getCurrentUserRole(): Promise<string | null> {
    const session = await getServerSession();

    if (!session?.user?.address) return null;

    const user = await prisma.user.findUnique({
        where: { wallet: session.user.address },
        include: { role: true },
    });

    return user?.role.name || null;
}

export async function hasRole(roles: string[] | string): Promise<boolean> {
    const currentRole = await getCurrentUserRole();
    if (!currentRole) return false;
    
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return requiredRoles.includes(currentRole);
}

export async function isAdmin() {
    return hasRole("ADMIN");
}

export async function isUser() {
    return hasRole("USER");
}