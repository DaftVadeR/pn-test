import React from "react";

import LoginTemplate from "../components/layout/login";

import Onboard from '@/components/pages/onboard';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if(session) {
    return redirect('/food-items');
  }

  return (
    <LoginTemplate bgClass={'bg-primaryGreenDark'}>
      <Onboard />
    </LoginTemplate>
  );
};
