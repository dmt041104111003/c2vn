/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '~/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ profile: user.profile || null })
  } catch (err) {
    console.error('Error fetching profile:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, dob, phone, hometown } = body

    let user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || null,
          image: session.user.image || null,
        },
      })
    }

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: { name, dob, phone, hometown },
      create: { userId: user.id, name, dob, phone, hometown },
    })

    return NextResponse.json({ profile })
  } catch (err) {
    console.error('Error saving profile:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GETBYID(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}


export async function PUT(request: NextRequest, id: string) {
  try {
    const body = await request.json()
    const { email, name, image, dob, phone, hometown } = body

    const user = await prisma.user.update({
      where: { id },
      data: { email, name, image },
    })

    const profile = await prisma.profile.upsert({
      where: { userId: id },
      update: { name, dob, phone, hometown },
      create: { userId: id, name, dob, phone, hometown },
    })

    return NextResponse.json({ user, profile })
  } catch (err) {
    console.error('Error updating user:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(id: string) {
  try {
    await prisma.profile.deleteMany({ where: { userId: id } })
    const deletedUser = await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'User and profile deleted successfully', user: deletedUser })
  } catch (err) {
    return NextResponse.json({ error: 'Database delete error' }, { status: 500 })
  }
}

export async function GET_ALL() {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true },
    })
    return NextResponse.json(users)
  } catch (err) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
export async function SEARCH(term: string) {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: term, mode: 'insensitive' } },
          { name: { contains: term, mode: 'insensitive' } },
        ],
      },
      include: { profile: true },
    })
    return NextResponse.json(users)
  } catch (err) {
    return NextResponse.json({ error: 'Search error' }, { status: 500 })
  }
}