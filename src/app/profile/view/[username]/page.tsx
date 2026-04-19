import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ProfilePageCard from '@/components/ProfilePageCard';


/** Render a list of stuff for the logged in user. */
export default async function ViewProfile({ params }: { params: { username: string } }) {
  const { username } = await params;
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; };
    } | null,
  );
  //const owner = (session && session.user && session.user.username) || '';
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if(!user) {
    return <div>User not found</div>;
  }
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Profile</h1>
            <ProfilePageCard user={user} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};
