import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthConfig } from 'next-auth';
import prisma from '@/lib/prisma';
 
export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  basePath: "/",
  trustHost: true,
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;      
      return isLoggedIn;
    },
    session: async ({ session, user, token }) => {
      session.user.id = user?.id;
      session.user.id = token.sub!; // Adds user ID to session for use in server actions.
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user) return true;
      return false;
    },
    async redirect({ url, baseUrl = process.env.NEXTAUTH_URL }) {
      return url;
    },
    async jwt({ token, user, account }) {
      return token;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  adapter: PrismaAdapter(prisma),
  providers: [], // Add providers with an empty array for now
};
