'use client';

import { Card, Image } from 'react-bootstrap';
import { User } from '@prisma/client';

const TeammateCard = ({ user }: { user: User }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Image src={user.pfp || '/default-pfp.png'} width={75} alt='contact-image' className='pb-2'/>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>Skill: {user.skill}</Card.Text>
        <Card.Text>{user.bio}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TeammateCard;