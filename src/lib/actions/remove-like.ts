'use server';

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

export default async function removeLike (foodItemId: string): Promise<null | boolean> {
  let session = await auth();

  if(!session?.user?.id) {
    console.log('error - user empty for some reason');
    return null;
  }

  try {
    const prisma = new PrismaClient();

    // Used deleteMany to get around the forcing of explicit ID usage with deletes in Prisma.
    await prisma.likedFoodItem.deleteMany({
      where: {
        userId: session?.user?.id!,
        foodItemId: `${foodItemId}`,
      }
    });
    
    return true;
  } catch (e) {
    console.error(e);
  }

  return false;
};