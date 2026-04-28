import Link from 'next/link';
import { Col, Container, Row,Form, InputGroup, Navbar, Nav,} from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { Search } from 'react-bootstrap-icons';
import TeamCard from '@/components/TeamCard';
import TeammateCard from '@/components/TeammateCard';

/** Render a list of stuff for the logged in user. */
const Teammates = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );
  
  const currentUser = session?.user?.username ? session.user.username : '';
  const user = await prisma.user.findUnique({
  where: { username: currentUser },
  include: {
    team: {
      include: {
        users: true,
        owner: true,
      },
    },
  },
});
  const team = user?.team;
const teammates = team?.users || [];

const isOwner = team?.ownerId === user?.id;
const inTeam = !!team;

  return (
    <main>
      <Container className="mb-3 pt-3">
        <Row>
          <Col className="d-flex justify-content-center gap-3">
                  {isOwner && (
        //<form action={disbandTeam}>
          <button className="btn btn-danger">
            Disband Team
          </button>
        //</form>
      )}

      {!isOwner && inTeam && (
        //<form action={leaveTeam}>
          <button className="btn btn-warning">
            Leave Team
          </button>
       // </form>
      )}
                </Col>
            </Row>
        </Container>
      <Container fluid className='align-items-center'>
        <Row>
          {teammates.map((teammate) => (
            <Container key={teammate.id}>
                <TeammateCard user={teammate} />
            </Container>
            ))}
        </Row>
      </Container>
    </main>
  );
};

export default Teammates;
