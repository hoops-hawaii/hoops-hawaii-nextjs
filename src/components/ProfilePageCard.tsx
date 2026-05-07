'use client';
import { Card, Image } from 'react-bootstrap';
import { User } from '@prisma/client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

/* Renders a single Contact. See list/page.tsx. */
const ProfilePageCard = ({ user }: { user: User }) => {
  const { data: session, status } = useSession();
  if (status === 'loading') return null;
  const currentUser = session?.user?.username;
  /*
  const fList = prisma.user.findMany({
    where: { username: { in: user.friends } },
  });
  */
  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
      <Card.Header className="bg-white border-0 p-3">
        <div className="d-flex align-items-center gap-3">
          <Image src={user.pfp || '/default-pfp.png'} width={75} alt='contact-image' />
          <div className="flex-grow-1">
            <Card.Title className="mb-1 fw-bold">
              {user.username}
            </Card.Title>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="px-3 pt-2">
        <Card.Text>Bio: {user.bio}</Card.Text>
        <Card.Text>Skill: {user.skill}</Card.Text>
        {/* <Card.Text>Friends: {fList.map(f => <ProfileItem key={f.id} {...f} />)}</Card.Text> */}
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
