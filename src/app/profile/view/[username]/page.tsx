import { Col, Container, Row, Image, Button, Card } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
  const ownerId = session?.user?.id ? Number(session.user.id) : NaN;
  const ownerUsername = session?.user?.username;

  let owner = Number.isNaN(ownerId)
    ? null
    : await prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

  if (!owner && ownerUsername) {
    owner = await prisma.user.findUnique({
      where: {
        username: ownerUsername,
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      homeCourt: true,
    }
  });

  if (!user) {
    return <h1 className='text-white'>User not found</h1>;
  }

  const flist = await prisma.user.findMany({
    where: {
      username: {
        in: user.friends || [],
      },
    },
  });

  const formatSkill = (skill: string) => skill.charAt(0).toUpperCase() + skill.slice(1);

  return (
    <main className="min-vh-100 d-flex justify-content-center align-items-center py-5">
      <Container fluid="md">
        <Card className="shadow-lg border-0 rounded-4 p-4">

          {/* Top Section */}
          <Row className="align-items-center mb-4">
            <Col md={6} className="d-flex align-items-center">
              <Image
                src={user.pfp || '/default-pfp.png'}
                width={140}
                height={140}
                alt="profile-image"
                roundedCircle
                className="shadow-sm"
              />
              <div className="ms-4">
                <h1 className="fw-bold mb-1">{user.username}</h1>
                <p className="text-muted mb-0">Skill Level: {formatSkill(user.skill)}</p>
              </div>
            </Col>

            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <h6 className="fw-semibold mb-1">Home Court</h6>
              <p className="text-muted mb-0">
                {user.homeCourt?.name || "No home court set"}
              </p>
            </Col>
          </Row>

          <hr />

          {/* Bio + Friends */}
          <Row className="mb-4">
            <Col>
              <h5 className="mb-2">Bio</h5>
              <p className="text-muted">{user.bio || "No bio yet."}</p>
            </Col>
          </Row>

          <hr />

          {/* Friends */}
          <Row className="mt-3">
            <Col>
              <h5 className="mb-2">Friends</h5>

              <div className="d-flex flex-wrap gap-2 align-items-center">
                {flist.map((u) => (
                  <OverlayTrigger
                    key={u.id}
                    placement="top"
                    overlay={<Tooltip>{u.username}</Tooltip>}
                  >
                    <Image
                      src={u.pfp || "/default-pfp.png"}
                      width={45}
                      height={45}
                      alt={u.username}
                      roundedCircle
                      className="border shadow-sm"
                      style={{ objectFit: "cover", cursor: "pointer" }}
                    />
                  </OverlayTrigger>
                ))}
              </div>
            </Col>
          </Row>

          {/* Actions */}
          {user.username === session?.user?.username && (
            <Row className="mt-4">
              <Col className="d-flex gap-2">
                <Button variant="warning" href={`/profile/edit/${user.username}`}>
                  Edit Profile
                </Button>
                <Button variant="danger" href="/auth/signout">
                  Sign Out
                </Button>
              </Col>
            </Row>
          )}

        </Card>
      </Container>
    </main>
  );
};
