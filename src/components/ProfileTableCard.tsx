'use client';
import { Button, Image, Card } from 'react-bootstrap';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { removeFriend, addFriend } from '@/lib/dbActions';
import Link from 'next/link';

type UserWithCourt = User & {
  homeCourt?: {
    name: string;
  } | null;
};

/* Renders a single profile. See profile/view/[username]/page.tsx. */
const ProfileTableCard = ({ user, owner }: { user: UserWithCourt; owner: User }) => {
  const { data: session, status } = useSession();
  if (status === 'loading') return null;
  const currentUser = session?.user?.username;
  /*
  const fList = prisma.user.findMany({
    where: { username: { in: user.friends } },
  });
  */

  return (
    <Card className="mb-3 shadow-sm border-0 rounded-4">
      <Card.Body className="d-flex align-items-center justify-content-between">

        {/* LEFT SIDE */}
        <div className="d-flex align-items-center gap-3">

          <Image
            src={user.pfp || "/default-pfp.png"}
            width={55}
            height={55}
            roundedCircle
            className="border shadow-sm"
            style={{ objectFit: "cover" }}
            alt="profile-image"
          />

          <div>
            <Link
              href={`/profile/view/${user.username}`}
              className="text-decoration-none fw-bold text-dark"
            >
              {user.username}
            </Link>

            <div className="text-muted small">
              Skill: {user.skill}
            </div>

            <div className="text-muted small">
              Home Court: {user.homeCourt?.name || 'None'}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (UNCHANGED LOGIC BLOCK) */}
        <div>
          {currentUser === user.username ? (
            <span className="badge bg-dark px-3 py-2 rounded-pill">
              You
            </span>
          ) : owner.friends.includes(user.username) ? (
            <Button
              className="bg-success btn btn-danger position-relative z-3"
              onClick={(e) => {
                e.stopPropagation();
                removeFriend(currentUser!, user.username);
              }}
            >
              Remove Friend
            </Button>
          ) : (
            <Button
              className="bg-success btn btn-primary position-relative z-3"
              onClick={(e) => {
                e.stopPropagation();
                addFriend(currentUser!, user.username);
              }}
            >
              Add Friend
            </Button>
          )}
        </div>

      </Card.Body>
    </Card>
  );
};

export default ProfileTableCard;
