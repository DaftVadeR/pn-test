'use server';

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export default async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log('formdata', formData);
    
    await signIn('credentials', {
      redirect: false,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    // Manual redirect as next auth beta's built in redirect throws an error due to bug.
    console.log('redirecting...');
    redirect('/');
  } catch (error) {
    // console.log(error);
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