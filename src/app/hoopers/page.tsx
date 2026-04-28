import { Container } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import SearchPage from '@/components/SearchPage';

/** Render a list of stuff for the logged in user. */
const HoopersPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    },
  );
  const owner = (session && session.user && session.user.username)!;
  const user = await prisma.user.findUnique({
    where: {
      username: owner,
    },
  });
  if (!user) {
  throw new Error(`User with ID ${user} not found`);
}
  const users = await prisma.user.findMany({
    where: {
      
    },
  });
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
            <h1>All Hoopers</h1>
            <SearchPage allUsers={users} owner={user} />
      </Container>
    </main>
  );
};

export default HoopersPage;
