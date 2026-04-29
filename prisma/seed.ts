import 'dotenv/config';
import { PrismaClient, Role, Condition } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const connectionString = 
  process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING

if(!connectionString){
  throw new Error('Missing POSTGRES_PRISMA_URL or DATABASE_URL');
}

const adapter = new PrismaPg({connectionString});
const prisma = new PrismaClient({adapter})

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
      update: {
        name: data.name,
        address: data.address,
        environment: data.environment,
        capacity: data.capacity,
        present: data.present,
        condition,
        imageURL: data.imageURL || null,
      },
      create: {
        name: data.name,
        address: data.address,
        environment: data.environment,
        capacity: data.capacity,
        present: data.present,
        condition,
        imageURL: data.imageURL || null,
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
