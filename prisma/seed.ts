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

const getRandomImageUrl = () => `https://placehold.co/500x500/333/${genRanHex(6)}`;

const foodItems: Prisma.FoodItemCreateInput[] = [
];

const toUppercase = (paragraph: string) => {
  return `${paragraph.charAt(0).toUpperCase()}${paragraph.slice(1)}`;
}

for (let i = 0; i < 20; i++) {
  let numWords = 2;

  let name: string = fastLoremIpsum(`${numWords}w`);
  let descriptionUppercase: string = toUppercase(fastLoremIpsum(`75w`))+"\n\n\n\n"+toUppercase(fastLoremIpsum(`75w`));
  let nutritional_facts: string = fastLoremIpsum(`105w`);

  let nameUppercase: string = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  let nfUppercase: string = `${nutritional_facts.charAt(0).toUpperCase()}${nutritional_facts.slice(1)}`;

  foodItems.push({
    name: nameUppercase,
    description: descriptionUppercase,
    nutritional_facts: nfUppercase,
    images: {
      create: [
        {
          url: getRandomImageUrl(),
        },
        {
          url: getRandomImageUrl(),
        },
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

// Had food items working locally. Changed to remote API.
// doSeed();
