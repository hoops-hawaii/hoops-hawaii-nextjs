
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      username?: string;
      name?: string;
      role?: string;
      image?: string;
    } & DefaultSession['user'];
  }
}

// Export v5 handlers and helpers
export const { auth, signIn, signOut, handlers } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'username', placeholder: 'placeholderName' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Type guard for credentials
        if (
          !credentials ||
          typeof credentials.username !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }
        const user = await prisma.user.findUnique({ where: { username: credentials.username } });
        if (!user || typeof user.password !== 'string') return null;
        
        const isValid = await bcrypt.compare(credentials.password, user.password);
        //const isValid = credentials.password === user.password;
        if (!isValid) return null;
        // Return user object for session
        return {
          id: user.id.toString(),
          username: user.username,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string | undefined,
          username: token.username as string | undefined,
          role: token.role as string | undefined,
        },
      };
    },
    async jwt({ token, user, trigger, session }) {
      // 1. Handle explicit updates from the client
      if (trigger === "update" && session?.user?.username) {
        token.username = session.user.username;
        // If you update name/role too, add them here:
        // token.name = session.user.name; 
      }

      // 2. Handle initial sign-in (only runs when 'user' is defined)
      if (user) {
        token.id = (user as { id?: string }).id;
        token.role = (user as { role?: string }).role;
        token.username = (user as { username?: string }).username;
      }
      return token;
    },
  },
});
