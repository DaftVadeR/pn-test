'use client';

import React, { useCallback, useEffect, useReducer, useState } from "react";
import { FoodItemState, FoodItemContextAction, FoodItemContextProps, SET_LIKED, SET_UNLIKED, REFETCH_FOOD_ITEM, FoodItemActionType, SET_FETCHING } from "./type";
import addLike from "../../actions/add-like";
import removeLike from "../../actions/remove-like";
import getRandomFoodItem from "../../actions/get-food-item";

const defaultVals: FoodItemState = {  
  isLiked: false,
  foodItem: undefined,
  fetching: false,
  fetched: false,
  toggleLike: (isLiked: boolean) => {},
  refetch: () => {},
};

export const FoodItemContext = React.createContext(defaultVals);

const foodItemStateReducer = (state: FoodItemState, action: FoodItemContextAction): FoodItemState => {
  switch (action.type) {
    case SET_LIKED:
      return { ...state, isLiked: true};
    case SET_FETCHING:
      return { ...state, fetching: true };
    case SET_UNLIKED:
      return { ...state, isLiked: false};
    case REFETCH_FOOD_ITEM:
      return { ...state, foodItem: action.payload?.foodItem, fetching: false, fetched: true };
    default:
      return { ...state };
  }
};

const FoodItemContextProvider = ({ children }: FoodItemContextProps) => {
  const [ state, dispatch ] = useReducer(foodItemStateReducer, {
    ...defaultVals,
  });

  const [queryRun, setQueryRun] = useState(false);

  // Had Like working with Prisma table, but after changing to remote API there's no like functionality.
  const asyncDispatch = useCallback(async (action: FoodItemActionType, foodItemId: string|null = null) => {
    switch (action) {
      case SET_LIKED:
        if(foodItemId) {
          await addLike(foodItemId);
          dispatch({ type: SET_LIKED });
        }
        break;
      case SET_UNLIKED:
        if(foodItemId) {
          await removeLike(foodItemId);
          dispatch({ type: SET_UNLIKED });
        }
        break;
      case REFETCH_FOOD_ITEM:
        dispatch({ type: SET_FETCHING, payload: {} });
        let foodItem = await getRandomFoodItem();
        dispatch({ type: REFETCH_FOOD_ITEM, payload: { foodItem }});
        break;
      default:
        return;
    }
  }, []);

  const toggleLike = useCallback((isLiked: boolean) => {
    if(state.foodItem?.id) {
      if(isLiked) {
        asyncDispatch(SET_LIKED, state.foodItem?.id);      
      } else {
        asyncDispatch(SET_UNLIKED, state.foodItem?.id);
      }
    }    
  }, [asyncDispatch, state]);

  const refetch = useCallback(() => {
    asyncDispatch(REFETCH_FOOD_ITEM);    
  }, [asyncDispatch]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <FoodItemContext.Provider
      value={{
        ...state,
        toggleLike,
        refetch
      }}
    >
      {children}
    </FoodItemContext.Provider>
  );
};

export default FoodItemContextProvider;