import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type AuthRequest = NextRequest & { auth?: { user?: { id?: string; username?: string } } };

export const POST = auth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const session = (request as AuthRequest).auth;
    const userId = session?.user?.id ? Number(session.user.id) : NaN;
    const username = session?.user?.username;
    const { id } = await params;
    const courtId = parseInt(id, 10);

    if (Number.isNaN(userId) && !username) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isNaN(courtId)) {
      return NextResponse.json({ error: 'Invalid court ID' }, { status: 400 });
    }

    let user = Number.isNaN(userId)
      ? null
      : await prisma.user.findUnique({
          where: { id: userId },
        });

    if (!user && username) {
      user = await prisma.user.findUnique({
        where: { username },
      });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove the court from user's saved courts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedCourts: {
          disconnect: { id: courtId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error unsaving court:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});