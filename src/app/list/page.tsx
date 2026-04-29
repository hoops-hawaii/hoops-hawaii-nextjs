import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import MyCourtsCard from '@/components/MyCourtsCard';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );

  const courts = await prisma.court.findMany({
    include: {
      news: true,
      users: true,
    },
  });
  // console.log(stuff);
  return (
    <main>
      <Container id="myCourts" fluid className="py-3">
        <Row>
          {courts.map((court) => (
            <Col key={court.id} xs={12} sm={6} md={4} lg={3} className="g-4">
              <MyCourtsCard court={court} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
