'use client';
import { Card, Col, Image } from 'react-bootstrap';
import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

/* Renders a single Contact. See list/page.tsx. */
const ProfilePageCard = ({ user }: {user: User}) => {
    const { data: session, status } = useSession();
    const pathName = usePathname();
    if (status === 'loading') return null;
    const currentUser = session?.user?.username;
  return (
  <Card className="h-100">
    <Card.Header>
      <Image src={user.pfp || '/default-pfp.png'} width={75} alt='contact-image'/>
      <Card.Title>
        {user.username}
        </Card.Title>
        <Card.Subtitle> Home Court ID: {user.homeCourtId} </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>Bio: {user.bio}</Card.Text>
      <Card.Text>Skill: {user.skill}</Card.Text>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-between align-items-center">
      {currentUser === user.username && (
        <>
        <Link href={`/profile/edit/${user.username}`} className="btn btn-primary">
          Edit Profile
        </Link>
      
        <Link href="/auth/signout" className="btn btn-danger">
          Sign Out
        </Link>
        </>
        )}
    </Card.Footer>
  </Card>
  );
};

export default ProfilePageCard;
