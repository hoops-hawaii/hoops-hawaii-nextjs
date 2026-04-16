'use client';
import { Card, Image } from 'react-bootstrap';
import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

/* Renders a single Contact. See list/page.tsx. */
const ProfileCard = ({ user }: {user: User}) => {
    const { data: session, status } = useSession();
    const pathName = usePathname();
    if (status === 'loading') return null;
    const currentUser = session?.user?.email;
    const role = session?.user?.role;
  return (
  <Card className="h-100">
    <Card.Header>
      <Image src={user.pfp} width={75} alt='contact-image'/>
      <Card.Title>
        {user.username}
        </Card.Title>
        <Card.Subtitle> {user.homeCourt} </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{user.bio}</Card.Text>
    </Card.Body>
    <Card.Footer>
      {currentUser && currentUser.username === user.username && (
        <Link href={`/profile/edit/${user.id}`}>Edit</Link>
      )}
    </Card.Footer>
  </Card>
  );
};

export default ProfileCard;
