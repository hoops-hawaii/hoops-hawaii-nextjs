import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const POST = auth(async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const session = (request as any).auth;
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(session.user.id);
    const { id } = await params;
    const courtId = parseInt(id);
    if (isNaN(courtId)) {
      return NextResponse.json({ error: 'Invalid court ID' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { presentAtId: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.presentAtId !== courtId) {
      return NextResponse.json({ error: 'Not checked in to this court' }, { status: 400 });
    }

    const court = await prisma.court.findUnique({
      where: { id: courtId },
      select: { present: true },
    });

    if (!court) {
      return NextResponse.json({ error: 'Court not found' }, { status: 404 });
    }

    // Update user and court in a transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { presentAtId: null },
      }),
      prisma.court.update({
        where: { id: courtId },
        data: { present: Math.max(0, court.present - 1) },
      }),
    ]);

    return NextResponse.json({ present: Math.max(0, court.present - 1) });
  } catch (error) {
    console.error('Error checking out:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});