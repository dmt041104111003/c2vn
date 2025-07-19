import { getServerSession } from "next-auth";
import { prisma } from "~/lib/prisma";


export async function getCurrentUserRoles(): Promise<string[]> {
    const session = await getServerSession();

    if (!session?.user?.email) return [];

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { roles: true },
    });

    return user?.roles.map((role) => role.name) || [];
}


export async function hasRole(roles: string[] | string): Promise<boolean> {
    const currentRoles = await getCurrentUserRoles();
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return currentRoles.some((role) => requiredRoles.includes(role));
}


export async function isAdmin() {
    return hasRole("ADMIN");
}

export async function isEditor() {
    return hasRole("EDITOR");
}

export async function isAuthor() {
    return hasRole("AUTHOR");
}

export async function isUser() {
    return hasRole("USER");
}
export async function isGuest() {
    return hasRole("GUEST");
}