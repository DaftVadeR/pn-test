'use server';

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

export default async function addLike (foodItemId: string): Promise<null | boolean> {
  let session = await auth();

  if(!session?.user?.id) {
    console.log('error - user empty for some reason');
    return null;
  }

  try {
    const prisma = new PrismaClient();

    await prisma.likedFoodItem.create({
      data: {
        userId: session?.user?.id,
        foodItemId,
      }
    });

    return !!foodItemId;
  } catch (e) {
    console.error(e);
  }

  return false;
};