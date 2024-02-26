import { FoodItem } from "@/src/components/food-items/types";

export const SET_LIKED = 1;
export const SET_UNLIKED = 2;
export const REFETCH_FOOD_ITEM = 3;
export const SET_FETCHING = 4;

export type FoodItemActionType = typeof SET_LIKED | typeof SET_UNLIKED | typeof REFETCH_FOOD_ITEM | typeof SET_FETCHING;

export type FoodItemContextProps = {
  children: React.ReactNode | React.ReactNode[]
};

export type FoodItemContextAction = {
  payload?: {
    foodItemId?: string,
    foodItem?: FoodItem
  },
  type: FoodItemActionType
};

export type FoodItemPayload = {
  isOpen: boolean
};

export type FoodItemState = {  
  isLiked: boolean,
  foodItem?: FoodItem,
  fetching: boolean,
  fetched: boolean,
  toggleLike: (isLiked: boolean) => void,
  refetch: () => void,
};