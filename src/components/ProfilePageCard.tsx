'use client';
import { Card, Image } from 'react-bootstrap';
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
        <Card.Subtitle> {user.homeCourtId} </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{user.bio}</Card.Text>
    </Card.Body>
    <Card.Footer>
      {currentUser === user.username && (
        <Link href={`/profile/edit/${user.username}`}>Edit</Link>
      )}
    </Card.Footer>
  </Card>
  );
};

export default ProfilePageCard;
