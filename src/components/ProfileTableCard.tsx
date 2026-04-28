'use client';
import { Button, Image } from 'react-bootstrap';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { removeFriend, addFriend } from '@/lib/dbActions';
import Link from 'next/link';

/* Renders a single profile. See profile/view/[username]/page.tsx. */
const ProfileTableCard = ({ user, owner }: {user: User; owner: User}) => {
    const { data: session, status } = useSession();
    if (status === 'loading') return null;
    const currentUser = session?.user?.username;
    /*
    const fList = prisma.user.findMany({
      where: { username: { in: user.friends } },
    });
    */
  return (
    <tr key={user.id} className='position-relative clickable-row'>
      <td> <Image src={user.pfp || '/default-pfp.png'} width={50} alt='profile-image'/> </td>
      <td>
        {/* 2. Wrap the name in a Link with 'stretched-link' */}
        <Link 
            href={`/profile/view/${user.username}`} 
            className="stretched-link text-decoration-none text-black"
          >
          {user.username}
        </Link>
      </td>
      <td>{user.skill}</td>
      <td>{user.homeCourtId}</td>
      <td>
        
        {currentUser === user.username ? (
          <p>You</p>
        ) : owner.friends.includes(user.username) ? (
      <Button className="btn btn-danger position-relative z-3" onClick={(e) => {e.stopPropagation(); removeFriend(currentUser!, user.username)}}>
        Remove Friend
      </Button>
      ) : (
      <Button className="btn btn-primary position-relative z-3" onClick={(e) => {e.stopPropagation(); addFriend(currentUser!, user.username)}}>
        Add Friend
      </Button>
    )}
      </td>
    </tr>
  );
};

export default ProfileTableCard;
