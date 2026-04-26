'use client';

import { Button, Card } from 'react-bootstrap';
import { joinTeam } from '@/lib/dbActions';
import { Team } from "@prisma/client";

const TeamCard = ({ team }: { team: Team }) => {
  const handleJoin = async () => {
    await joinTeam(team.id);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{team.name}</Card.Title>
        <Card.Text>{team.description}</Card.Text>
        <Button onClick={handleJoin}>
          Join Team
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;