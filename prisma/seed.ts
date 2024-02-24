import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from '@prisma/client';
var fastLoremIpsum = require('fast-lorem-ipsum');

const prisma = new PrismaClient();

const pwd = bcrypt.hashSync('testpwd', 10);

/* https://stackoverflow.com/questions/58325771/how-to-generate-random-hex-string-in-javascript */
const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Ross',
    email: 'ross@test.com',
    password: pwd,
  }
];

const getRandomImageUrl = () => `https://placehold.co/500x500/EEE/${genRanHex(6)}`;

const foodItems: Prisma.FoodItemCreateInput[] = [
];

for (let i = 0; i < 20; i++) {
  let numWords = Math.floor(Math.random() * 2) + 1;
  console.log('numwords', numWords);

  foodItems.push({
    name: fastLoremIpsum(`${numWords}w`),
    description: fastLoremIpsum(`80w`),
    nutrititional_facts: fastLoremIpsum(`80w`),
    images: {
      create: [
        {
          url: getRandomImageUrl(),
        }
      ]
    }
  });
}

const main = async () => {
  console.log(`Start seeding ...`);

  /* Users */
  for (const u of userData) {
    console.log('user', u, userData);
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }  

  /* Food items */
  for (const fi of foodItems) {
    console.log('food item', fi, userData);
    const foodItem = await prisma.foodItem.create({
      data: fi,
    });

    console.log(`Created food item with id: ${foodItem.id}`);
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
