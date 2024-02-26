import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

type LoginProps = {
  email: string;
  password: string;
}

async function loginUser({ email, password } : LoginProps): Promise<User | null> {
  try {
    let userResponse = await fetch(
      "https://ciaochow.plusnarrative.biz/api/auth/local",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ identifier: email, password })
      }
    );

    if(userResponse.ok) {
      return userResponse.json() as any;
    }
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

          let response = await loginUser({ email, password });
          
          console.log('LOG IN USER RECORD', response);

          const user = { ...response.user, jwt: response.jwt };

          return user as any;

          // Had login working via Prisma. Changed to API above.

          // const user = await getUser(email);

          // if (user && user.password) {
          //   try {
          //     const valid = await bcrypt.compare(password, user.password);

          //     if(valid) {
          //       const finalUser = { ...user, email: user.email };
                
          //       return finalUser as any;
          //     }
          //   } catch (error) {
          //     console.log("Auth failed", error);
          //   }
          // }
        }
      },
    }),
  ],
});