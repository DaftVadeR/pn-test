import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const pwd = bcrypt.hashSync('testpwd', 10);

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Ross',
    email: 'ross@test.com',
    password: pwd,
  }
];

const main = async () => {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    console.log('user', u, userData);
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
};

const doSeed = async () => {
  try {
    await main();
    await prisma.$disconnect();
  }
  catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

doSeed();
