import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ProfileCard from '@/components/ProfileCard';


/** Render a list of stuff for the logged in user. */
const ViewProfile = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; };
    } | null,
  );
  const owner = (session && session.user && session.user.username) || '';
  const users = await prisma.user.findMany({
    where: {
      username: session?.user?.username,
    },
  });
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Stuff</h1>
            <ProfileCard user={users[0]} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ViewProfile;
