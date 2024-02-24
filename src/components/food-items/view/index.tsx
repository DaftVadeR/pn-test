'use client';

import { useContext } from 'react';
import ViewFoodItemPage from './page';
import FoodItemContextProvider, { FoodItemContext } from '@/src/lib/contexts/food-item';

const ViewFoodItemPageWithState = () => {
  const { foodItem } = useContext(FoodItemContext);
  
  if(!foodItem) return null;

  return (
    <ViewFoodItemPage foodItem={foodItem} />
  );
}

const ViewFoodItemPageWithProvider = () => {
  return (
    <FoodItemContextProvider>
      <ViewFoodItemPageWithState />
    </FoodItemContextProvider>
  )
};

export default ViewFoodItemPageWithProvider;