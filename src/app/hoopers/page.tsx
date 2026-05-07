import type { User } from '@prisma/client';
import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import SearchPage from '@/components/SearchPage';

/** Render a list of stuff for the logged in user. */
const HoopersPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    },
  );

  const ownerId = session?.user?.id ? Number(session.user.id) : NaN;
  const ownerUsername = session?.user?.username;

  let owner: User | null = null;
  if (!Number.isNaN(ownerId)) {
    owner = await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });
  }

  if (!owner && ownerUsername) {
    owner = await prisma.user.findUnique({
      where: {
        username: ownerUsername,
      },
    });
  }

  const users = await prisma.user.findMany({});

  const ownerUser: User =
    owner ?? {
      id: ownerId || 0,
      username: ownerUsername || 'Unknown',
      pfp: null,
      password: '',
      role: 'USER',
      skill: 'mid',
      bio: '',
      homeCourtId: null,
      teamId: null,
      friends: [],
      presentAtId: null,
    };

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <SearchPage allUsers={users} owner={ownerUser} />
      </Container>
    </main>
  );
};

export default HoopersPage;
