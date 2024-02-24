'use server';

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

// Will fix types if have time.
export default async function getRandomFoodItem (): Promise<any> {
  let session = await auth();

  if(!session?.user?.id) {
    console.log('error - user empty for some reason');
    return null;
  }

  let foodItem = null;

  try {
    const prisma = new PrismaClient();

    // Hacky, and would be better to do it in queries only, but I'm new to Prisma and it feels like it gets in the way of doing stuff like this.
    // As such, get viewed items, create ID list, then do a query elimintating all items that have IDs in that list.
    const viewedItems = await prisma.viewedFoodItem.findMany({
      select: {
        foodItemId: true,
      },
      where: {
        userId: session?.user?.id,
      },
    });

    let viewedIds: string[] = [];

    viewedItems.map((viewedFoodItem) => {
      viewedIds.push(viewedFoodItem.foodItemId);
    });

    let foodItemQuery = {
      select: {
        id: true,
        nutritional_facts: true,
        description: true,
        name: true,
        images: true,
        likes: {
          where: {
            userId: session?.user?.id,
          }
        },
      }
    };

    foodItem = await prisma.foodItem.findFirst({
      ...foodItemQuery,
      where: {
        id: {
          notIn: viewedIds
        },
      },
    });

    // Add view
    if(foodItem && viewedIds.indexOf(foodItem.id) === -1) {
      await prisma.viewedFoodItem.create({
        data: {
          userId: session?.user?.id,
          foodItemId: foodItem.id,
        }
      });
    } else {
      // All items viewed, don't return nothing.
      foodItem = await prisma.foodItem.findFirst({
        ...foodItemQuery,
      });
    }

    return foodItem;
  } catch (e) {
    console.error(e);
  }

  return foodItem;
};