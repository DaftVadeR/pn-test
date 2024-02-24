'use server';

import { signOut } from "@/auth";

export default async function logOut() {
  console.log('clicked');

  await signOut({ redirect: true, redirectTo: '/login' });
}