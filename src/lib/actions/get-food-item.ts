'use server';

import { auth } from "@/auth";
import getFoodItemIds from "./get-food-item-ids";
import { FoodItem } from "@/src/components/food-items/types";


const getFoodItemResponse = async (id: number, token: string): Promise<any> => {
  let response = await fetch(`https://ciaochow.plusnarrative.biz/api/chows/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    return null;
  }

  let json = await response.json();

  return json;
}

// Will fix types if have time.
export default async function getRandomFoodItem (): Promise<any> {
  let session = await auth();

  if(!session?.user?.id) {
    return null;
  }

  let foodItem = null;

  try {
    let allIds = await getFoodItemIds();
    let randomId = allIds[Math.floor(Math.random() * allIds.length)];

    foodItem = await getFoodItemResponse(randomId, session.jwt);

    return foodItem.data as FoodItem;
  } catch (e) {
    console.error(e);
  }

  return foodItem;
};