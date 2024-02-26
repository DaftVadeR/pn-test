import React from "react";

import MainTemplate from "@/components/layout/main";

import ViewFoodItemPage from '@/components/food-items/view';

export default async function Home() {
  return (
    <MainTemplate>
      <ViewFoodItemPage />
    </MainTemplate>
  );
};
