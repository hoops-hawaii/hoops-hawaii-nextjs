'use server';

import { Condition, Court, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from './prisma';
import { refresh } from 'next/cache';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
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
export async function addCourt(data: {imageURL: string; name: string; address: string; environment: string; capacity: number; condition:string}) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (data.condition === 'trash') {
    condition = 'trash';
  } else if (data.condition === 'bad') {
    condition = 'bad';
  } else if (data.condition === 'mid') {
    condition = 'mid';
  } else  if (data.condition === 'very_good') {
    condition = 'very_good';
  }
  await prisma.court.create({
    data: {
      name: data.name,
      imageURL: data.imageURL,
      address:data.address,
      present: 0,
      environment: data.environment,
      capacity: data.capacity,
      condition,
    },
  });
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
}

export async function CreateTeam({ name, description }: { name: string; description: string }) {
  const session = await auth();

  if (!session?.user?.username) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existing = await prisma.team.findUnique({
    where: { ownerId: user.id },
  });

  if (existing) {
    alert("User already owns a team");
    return
  }

  await prisma.team.create({
    data: {
      name,
      description,
      owner: { connect: { id: user.id } },
      users: { connect: { id: user.id } },
    },
  });
}

export async function joinTeam(teamId: number) {
  const session = await auth();

  if (!session?.user?.username) {
    throw new Error('Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
    select: { teamId: true },
  });

  // Prevent joining if already in a team
  if (user?.teamId) {
    throw new Error('You are already in a team');
  }

  await prisma.user.update({
    where: { username: session.user.username },
    data: {
      teamId: teamId,
    },
  });
}

export async function disbandTeam() {
  const session = await auth();

  if (!session?.user?.username) {
    throw new Error('Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) throw new Error('User not found');

  const team = await prisma.team.findUnique({
    where: { ownerId: user.id },
  });

  if (!team) throw new Error('Not team owner');

  // remove all users from team
  await prisma.user.updateMany({
    where: { teamId: team.id },
    data: { teamId: null },
  });

  // delete team
  await prisma.team.delete({
    where: { id: team.id },
  });
}

export async function leaveTeam() {
  const session = await auth();

  if (!session?.user?.username) {
    throw new Error('Not authenticated');
  }

  await prisma.user.update({
    where: { username: session.user.username },
    data: {
      teamId: null,
    },
  });
}



export async function getUserTeamId(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { teamId: true },
  });

  return user?.teamId || null;
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

export async function saveCourts (courtId: number){
  const session = await auth();

  if (!session?.user?.username) {
    throw new Error('Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
    include: { savedCourts: true},
  });

  // Prevent joining if already in a team
  if (user?.homeCourtId) {
    alert('You are already added this court');
    return
  }


await prisma.user.update({
  where: { username: session.user.username },
  data: {
    savedCourts: {
      connect: { id: courtId }, // or court.id
    },
  },
});

revalidatePath("/find-courts");
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

export async function setHomeCourt(courtId: number) {
  const session = await auth();

  if (!session?.user?.username) {
    throw new Error('Not authenticated');
  }

  // OPTIONAL safety: ensure court exists
  const court = await prisma.court.findUnique({
    where: { id: courtId },
  });

  if (!court) {
    throw new Error("Court not found");
  }

  // Set ONLY one home court per user (overwrite old one)
  return prisma.user.update({
    where: { username: session.user.username },
    data: {
      homeCourtId: courtId,
    },
  });
}

export async function removeHomeCourt() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = Number(session.user.id);

  return prisma.user.update({
    where: { id: userId },
    data: {
      homeCourtId: null,
    },
  });
}
