import { Col, Container, Row, Image, Table, Button } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import ProfileTableCard from '@/components/ProfileTableCard';


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
  const ownerName = (session!.user.username);
  const owner = await prisma.user.findUnique({
    where: {
      username: ownerName,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  const flist = await prisma.user.findMany({
    where: {
      username: {
        in: user?.friends,
      },
    },
  });

  if(!user) {
    return <h1 className='text-white'>User not found</h1>;
  }

  return (
    <main>
      <Container id="centerTextBox" fluid className="py-3 px-5 text-white">
        <Row>
          <Col md={6} className="d-flex align-items-start mb-4 mb-md-0">
            <Image src={user.pfp || '/default-pfp.png'} width={150} alt='profile-image' className='mb-3'/>
            <div className="ms-4">
              <h1 className="display-5 fw-bold">{user.username}</h1>
              <p className="lead">Skill level: {user.skill}</p>
            </div>
          </Col>
          <Col>
            <p>
              {user.username}&apos;s home court: {//courtcard(user.homeCourt)}
            }</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Bio:</h2>
            <p>{user.bio}</p>
          </Col>
          <Col>
            <p>Friends List: {user.friends}</p>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Pfp</th>
                  <th>Name</th>
                  <th>Skill</th>
                  <th>Home Court</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {flist.map((u) => (
                    <ProfileTableCard key={u.id} user={u} owner={owner!} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
          {user.username === session?.user?.username && (
            <>
            <Button variant="warning" href={`/profile/edit/${user.username}`}>Edit Profile</Button>
            <Button variant="danger" href='/auth/signout' >Sign Out</Button>
            </>
          )}
          </Col>
        </Row>
      </Container>
    </main>
  );
};
