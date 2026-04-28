'use client';

import { Card } from 'react-bootstrap';
import { User } from '@prisma/client';

const TeammateCard = ({ user }: { user: User }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>Skill: {user.skill}</Card.Text>
        <Card.Text>{user.bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TeammateCard;