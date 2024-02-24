import React from "react";

import MainTemplate from "../components/layout/main";

import getRandomFoodItem from '@/lib/actions/get-food-item';

import ViewFoodItemPage from '@/components/food-items/view';

export default async function Home() {
  let foodItem = await getRandomFoodItem();

  return (
    <MainTemplate>
      <ViewFoodItemPage foodItem={foodItem} />
    </MainTemplate>
  );
};
