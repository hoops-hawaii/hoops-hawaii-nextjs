import { notFound } from 'next/navigation';
import { User } from '@prisma/client';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import EditProfileForm from '@/components/EditProfileForm';
import { Container } from 'react-bootstrap';

export default async function EditProfilePage({ params }: { params: { username: string } }) {
  const { username } = await params;
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );
  const user: User | null = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!user) {
    return notFound();
  }

  return (
    <main>
      <Container className="py-5">
      <EditProfileForm user={user} />
      </Container>
    </main>
  );
}
