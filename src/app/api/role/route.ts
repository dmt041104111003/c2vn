/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma';


export async function GET(): Promise<NextResponse> {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Roles fetched successfully',
      data: roles
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, description, is_default, permissionIds } = await request.json()

    const role = await prisma.role.create({
      data: {
        name,
        description,
        is_default,
        permissions: {
          create: permissionIds?.map((permissionId: string) => ({
            permission: { connect: { id: permissionId } }
          })) || []
        }
      },
      include: {
        permissions: { include: { permission: true } }
      }
    })

    return NextResponse.json({
      message: 'Role created successfully',
      data: role
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create role' },
      { status: 500 }
    )
  }
}
