'use server';

import { Condition, Court } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { User } from '@prisma/client';
import { Session } from 'inspector/promises';
import { refresh } from 'next/cache';
import { auth } from '@/lib/auth';
/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 * enum Condition {
  very_good
  good
  mid
  bad
  trash
}
 */
export async function addCourt(court: { name: string; address: string; environment: string; capacity: number; present: number; condition:string}) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (court.condition === 'trash') {
    condition = 'trash';
  } else if (court.condition === 'bad') {
    condition = 'bad';
  } else if (court.condition === 'mid') {
    condition = 'mid';
  } else {
    condition = 'very_good';
  }
  await prisma.court.create({
    data: {
      name: court.name,
      address:court.address,
      environment: court.environment,
      capacity: court.capacity,
      present: court.present,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editCourt(court: Court) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.court.update({
    where: { id: court.id },
    data: {
      name: court.name,
      address:court.address,
      environment: court.environment,
      capacity: court.capacity,
      present: court.present,
      condition: court.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteCourt(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.court.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

export async function CreateTeam({
  name,
  userId,
  description,
}: {
  name: string;
  userId: number;
  description: string;
}) {
   const existing = await prisma.team.findUnique({
    where: { ownerId: userId },
  });

  if (existing) {
    throw new Error("User already owns a team");
  }

 await prisma.team.create({
    data: {
      name,
      description,
      owner: {
        connect: { id: userId },
      },
      users: {
        connect: { id: userId },
      },
    },
  });
  redirect('/team/view');
}
export async function joinTeam(teamId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const userId = Number(session.user.id);

  await prisma.user.update({
    where: { id: userId },
    data: {
      teamId: teamId,
    },
  });
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { username: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      username: credentials.username,
      password,
    },
  });
}



/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { username: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { username: credentials.username },
    data: {
      password,
    },
  });
}

export async function editProfile(user: User) {
  await prisma.user.update({
    where: { id: user.id },
    data: {
      pfp: user.pfp,
      username: user.username,
      bio: user.bio,
      skill: user.skill,
      homeCourt: {
        connect: { id: user.homeCourtId! },
      },
      role: user.role,
      password: user.password,
      friends: user.friends,
    },
  });
}

export async function addFriend(username: string, friendUsername: string) {
  await prisma.user.update({
    where: { username },
    data: {
      friends: {
        push: friendUsername,
      },
    },
  });
  refresh();
}

export async function removeFriend(username: string, friendUsername: string) {
  await prisma.user.update({
    where: { username },
    data: {
      friends: {
        set: (await prisma.user.findUnique({ where: { username } }))?.friends.filter(
          (f) => f !== friendUsername
        ),
      },
    },
  });
  refresh();
}
