import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import MyCourtsGrid from '@/components/MyCourtsGrid';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Render a list of saved courts for the logged in user. */
const ListPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );

  const userId = session?.user?.id ? Number(session.user.id) : NaN;
  const username = session?.user?.username;

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

  const courts = user?.savedCourts ?? [];

  return (
    <main>
      <Container id="myCourts" fluid className="py-3">
        <MyCourtsGrid initialCourts={courts} />
      </Container>
    </main>
  );
};

export default ListPage;
