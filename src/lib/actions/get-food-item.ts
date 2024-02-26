'use server';

import { auth } from "@/auth";
import getFoodItemIds from "./get-food-item-ids";
import { FoodItem } from "@/src/components/food-items/types";


const getFoodItemResponse = async (id: number, token: string): Promise<FoodItem | null> => {
  let response = await fetch(`https://ciaochow.plusnarrative.biz/api/chows/${id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  console.log('response', await response.json());

  if(!response.ok) {
    return null;
  }

  let json = await response.json();

  return json;
}

// Will fix types if have time.
export default async function getRandomFoodItem (): Promise<any> {
  let session = await auth();

  console.log('getting here', session);

  if(!session?.user?.id) {
    console.log('error - user empty for some reason');
    return null;
  }

  let foodItem = null;

  try {
    let allIds = await getFoodItemIds();
    console.log('all ids', allIds);
    let randomId = allIds[Math.floor(Math.random() * allIds.length)];
    console.log('get item', randomId);
    console.log('session', session);

    foodItem = await getFoodItemResponse(randomId, session.jwt);

    console.log('got food item', foodItem);

    return foodItem;
  } catch (e) {
    console.error(e);
  }

  return foodItem;
};