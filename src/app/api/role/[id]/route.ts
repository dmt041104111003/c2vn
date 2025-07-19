/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "~/lib/prisma";
import { getServerSession } from "next-auth";
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
        
        if (!session?.user?.email) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    const { id } = params;
    const { name, description, is_default, permissionIds } = await request.json();

    await prisma.role.update({
      where: { id },
      data: { name, description, is_default },
    });

    if (Array.isArray(permissionIds)) {
      const validPermissions = await prisma.permission.findMany({
        where: { id: { in: permissionIds } },
      });

      if (validPermissions.length !== permissionIds.length) {
        return NextResponse.json({
          error: "One or more permissionIds are invalid",
          validPermissionIds: validPermissions.map(p => p.id),
        }, { status: 400 });
      }

      await prisma.rolePermission.deleteMany({ where: { role_id: id } });

      await prisma.rolePermission.createMany({
        data: permissionIds.map(pid => ({
          role_id: id,
          permission_id: pid,
        })),
      });
    }

    const fullRole = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: { include: { permission: true } },
      },
    });

    return NextResponse.json({
      message: "Role updated successfully",
      data: fullRole,
    });
  } catch (err) {
    console.error("Update role error:", err);
    return NextResponse.json(
      {
        error: "Failed to update role",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}


export async function DELETE(_: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    await prisma.rolePermission.deleteMany({ where: { role_id: id } });

    const role = await prisma.role.delete({ where: { id } });

    return NextResponse.json({
      message: "Role deleted successfully",
      data: role,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete role" }, { status: 500 });
  }
}
