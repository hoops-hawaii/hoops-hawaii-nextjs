import Link from 'next/link';
import { Col, Container, Row,Form, InputGroup, Navbar, Nav,} from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import { Search } from 'react-bootstrap-icons';
import TeamCard from '@/components/TeamCard';

/** Render a list of stuff for the logged in user. */
const View = async () => {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );
  const currentUser = session?.user?.username || '';
  const teams = await prisma.team.findMany({});
  return (
    <main>
      <Container fluid className='py-4'>
        <Row className="justify-content-center ">
          <Col md={6}>
            <InputGroup className="search-container">
              <div className="search-container position-relative">
                <Search className="search-icon" />
                <Form.Control
                type="text"
                placeholder="Search..."
                className="search-input"
                />
              </div>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container fluid className='align-items-center'>
        <div className="container-fluid d-flex justify-content-center">
            <Link href="/team/create" className="btn btn-warning">
              Create Team
            </Link>
        </div>
      </Container>
      <Container fluid className='align-items-center'>
        <Row>
          {teams.map((team) => (
              <Col key={team.id}>
                <TeamCard team = {team}/>
              </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default View;
