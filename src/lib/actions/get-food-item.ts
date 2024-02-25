'use server';

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

// Cant do order by rand() in Prisma without raw SQL so will always be in order of creation ID-wise
const getRandomFoodItemRecord = async (prisma: PrismaClient, foodItemQuery: Object, viewedIds: string[]) => {
  return await prisma.foodItem.findFirst({
    ...foodItemQuery,
    where: {
      id: {
        notIn: viewedIds
      },
    },
  });
}

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
      },
    };

    foodItem = await getRandomFoodItemRecord(prisma, foodItemQuery, viewedIds);

    // Add view
    if(foodItem && session?.user?.id && viewedIds.indexOf(foodItem.id) === -1) {
      try{ 
        await prisma.viewedFoodItem.create({
          data: {          
            userId: session.user.id,
            foodItemId: foodItem.id,
          }
        });
      } catch(e) {
        console.error('session user ID probably out of sync due to user table change/id changes', e);
      }
    } else {
      // All items viewed, don't return nothing.
      console.log('all items viewed');

      // For testing purposes - just going to clear all views so its tarts from 0 again. Prisma doesn't support ordering by rand() and
      // I'm not putting in the time to do raw SQL and then change the data structure to adjust for it.
      await prisma.viewedFoodItem.deleteMany({
        where: {
          userId: session?.user?.id,
        }
      });

      foodItem = await getRandomFoodItemRecord(prisma, foodItemQuery, viewedIds);
    }

    return foodItem;
  } catch (e) {
    console.error(e);
  }

  return foodItem;
};