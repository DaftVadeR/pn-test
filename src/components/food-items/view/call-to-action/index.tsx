'use client';

import { RedirectType, redirect } from "next/navigation";
import { NextButton } from "./style";
import { useContext } from "react";
import { FoodItemContext } from "@/src/lib/contexts/food-item";

const CallToAction = () => {
  const {refetch} = useContext(FoodItemContext);

  return (
    <>
      <NextButton onClick={() => {
        refetch();
      }}>
        Nah! Find something else.
      </NextButton>
    </>
  );
};

export default CallToAction;