'use server';

import { signIn } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import * as z from "zod";

export default async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const submitted = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      username: formData.get('username') as string
    };

    const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), username: z.string().min(3) })
          .safeParse(submitted);

    if (parsedCredentials.success) {
      const { email, password, username } = parsedCredentials.data;

      console.log('credentials', { email, password, username });

      let response = await fetch('https://ciaochow.plusnarrative.biz/api/auth/local/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          email,
          password, 
          username
        }),
      });

      if(response.ok) {
        await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        console.log('redirecting...');
        redirect('/food-items');
      } else {
        let result = await response.json();
        console.log(result);

        if(result?.error?.message) {
          return result.error.message;
        }
      }

      return 'Something went wrong. Please try again.';
    }
    // Manual redirect as next auth beta's built in redirect throws an error due to bug.
    
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    if (isRedirectError(error)) {
      throw error;
    }
  }
}