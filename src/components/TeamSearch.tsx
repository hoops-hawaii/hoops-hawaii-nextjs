'use client';

import { useState } from 'react';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import TeamCard from '@/components/TeamCard';
import { Team, User } from '@prisma/client';


type TeamWithRelations = Team & {
  users: User[];
  owner: User;
};

const TeamSearch = ({
  teams,
  hasTeam,
}: {
  teams: TeamWithRelations[];
  hasTeam: boolean;
}) => {
  const [search, setSearch] = useState('');

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* 🔍 Search */}
      <Container fluid className='py-4'>
        <Row className="justify-content-center">
          <Col md={6}>
            <InputGroup className="search-container">
              <div className="position-relative w-100">
                <Search className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search teams..."
                  className="search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row>
          {filteredTeams.map((team) => (
            <Container key={team.id}>
              <TeamCard team={team} hasTeam={hasTeam} />
            </Container>
          ))}
        </Row>

        {filteredTeams.length === 0 && (
          <p className="text-center mt-3">No teams found.</p>
        )}
      </Container>
    </>
  );
};

export default TeamSearch;