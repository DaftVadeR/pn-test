import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';
 
async function getUser(email: string): Promise<User | null> {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }

  return null;
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "CiaoChow Log in", // Form title

      credentials: {
        username: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if (user && user.password) {
            try {
              const valid = await bcrypt.compare(password, user.password);

              if(valid) {
                const finalUser = { ...user, email: user.email };
                
                return finalUser as any;
              }
            } catch (error) {
              console.log("Auth failed", error);
            }
          }
        }
      },
    }),
  ],
});