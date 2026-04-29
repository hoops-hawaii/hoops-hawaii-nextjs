import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import TeamSearch from '@/components/TeamSearch';

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
  const user = await prisma.user.findUnique({
  where: { username: currentUser },
  select: { teamId: true },
});

  const hasTeam = !!user?.teamId;
  const teams = await prisma.team.findMany({
  include: {
    users: true,
    owner: true,
  },
});
  return (
    <main>
      <Container fluid className="align-items-center pt-3">
  <Row className="justify-content-center">
    <Col md="auto">
      <div className="d-flex gap-3">
        <Link href="/team/create" className="btn btn-warning">
          Create Team
        </Link>

        {hasTeam && (
          <Link href="/team/teammates" className="btn btn-success">
            View My Team
          </Link>
        )}
      </div>
    </Col>
  </Row>
</Container>
      <TeamSearch teams={teams} hasTeam={hasTeam} />
    </main>
  );
};

export default View;
