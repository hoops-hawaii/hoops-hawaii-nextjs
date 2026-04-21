import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import CourtSearch from '@/components/CourtSearch';
import type { Court } from '@prisma/client';
import { Col, Container, Row, Table } from 'react-bootstrap';
import StuffItem from '@/components/StuffItem';

const FindCourtsPage = async ({ searchParams }: { searchParams: { search?: string; environment?: string; condition?: string } }) => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );

  const search = searchParams.search || '';
  const environment = searchParams.environment || '';
  const condition = searchParams.condition || '';

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
            <h1>Find Courts</h1>
            <CourtSearch />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Environment</th>
                  <th>Capacity</th>
                  <th>Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courts.map((item: Court) => (
                  <StuffItem key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FindCourtsPage;