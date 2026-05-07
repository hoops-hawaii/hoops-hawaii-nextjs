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
          include: { savedCourts: true },
        });

    if (!user && username) {
      user = await prisma.user.findUnique({
        where: { username },
        include: { savedCourts: true },
      });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const court = await prisma.court.findUnique({
      where: { id: courtId },
    });

    if (!court) {
      return NextResponse.json({ error: 'Court not found' }, { status: 404 });
    }

    if (user.savedCourts.some((savedCourt) => savedCourt.id === courtId)) {
      return NextResponse.json({ saved: true, message: 'Court already added' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        savedCourts: {
          connect: { id: courtId },
        },
      },
    });

    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error('Error saving court:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
