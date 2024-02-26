import { NextAuthConfig } from 'next-auth';

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
      const isLoggedIn = !!auth?.user && !!auth?.user?.email;
      return isLoggedIn;
    },
    session: async ({ session, user, token }) => {
      // session.user.id = user?.id;
      if(user) {
        session.jwt = user?.jwt;
        session.user.jwt = user?.jwt;
      } else if(token) {
        session.jwt = token.jwt;
        session.user.jwt = user?.jwt;
      }
      
      session.user.id = token.sub!; // Adds user ID to session for use in server actions.
      // session.user.jwt = token.sub!; // Adds user ID to session for use in server actions.
      return session;
    },
    async signIn({ user }) {
      if (user && user.email) return true;
      return false;
    },
    async redirect({ url }) {
      return url;
    },
    async jwt({ token, user }) {
      if(user) {
        token.jwt = user?.jwt;
        token.id = user?.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/register',
  },
  providers: [], // Add providers with an empty array for now
};
