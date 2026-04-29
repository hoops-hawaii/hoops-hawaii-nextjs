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

    // Remove the court from user's saved courts
    await prisma.user.update({
      where: { id: userId },
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