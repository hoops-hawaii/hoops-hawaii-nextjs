import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import CourtSearch from '@/components/CourtSearch';
import FindCourtsCard from '@/components/FindCourtsCard';
import type { Court } from '@prisma/client';
import { Col, Container, Row } from 'react-bootstrap';
import settings from '../../../config/settings.development.json';

const ensureDefaultCourts = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const courtCount = await prisma.court.count();
  if (courtCount > 0) {
    return;
  }

  await prisma.court.createMany({
    data: settings.defaultCourts.map((court) => ({
      name: court.name,
      address: court.address,
      environment: court.environment,
      capacity: court.capacity,
      present: court.present,
      condition: court.condition as Court['condition'],
      imageURL: court.imageURL,
    })),
  });
};

const FindCourtsPage = async ({ searchParams }: { searchParams: { search?: string; environment?: string; condition?: string } }) => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );

  const params = await searchParams;
  const search = params.search || '';
  const environment = params.environment || '';
  const condition = params.condition || '';

  await ensureDefaultCourts();

  const courts = await prisma.court.findMany({
    where: {
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
      ...(environment && { environment }),
      ...(condition && { condition: condition as Court['condition'] }),
    },
  });

  return (
    <main>
      <Container fluid className="py-3">
        <Row>
          <Col>
            <CourtSearch />
            <Row className="g-4 mt-3">
              {courts.map((court: Court) => (
                <Col key={court.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                  <FindCourtsCard court={court} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FindCourtsPage;