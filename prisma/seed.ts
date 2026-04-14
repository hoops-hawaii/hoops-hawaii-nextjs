import { PrismaClient, Role, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.USER;
    console.log(`  Creating user: ${account.username} with role: ${role}`);
    await prisma.user.upsert({
      where: { username: account.username },
      update: {
        password,
      },
      create: {
        username: account.username,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });
  for (const data of config.defaultCourts) {
    const condition = data.condition as Condition || Condition.good;
    console.log(`  Adding court: ${JSON.stringify(data)}`);
    await prisma.court.upsert({
      where: { id: config.defaultCourts.indexOf(data) + 1 },
      update: {},
      create: {
        name: data.name,
        address: data.address,
        environment: data.environment,
        capacity: data.capacity,
        present: data.present,
        condition,
      },
    });
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
