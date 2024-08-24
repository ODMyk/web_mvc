import NextAuth, {Session} from 'next-auth';
import google from 'next-auth/providers/google';
import prisma from './db';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const login = async (credentials: Partial<Record<string, unknown>>) => {
  const user = await prisma.user.findFirst({
    where: {email: credentials.email as string},
  });
  if (!user) {
    throw 'User not found';
  }

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password as string,
    user.password!,
  );
  if (!isPasswordCorrect) {
    throw 'Wrong credentials';
  }

  return {name: user.username, email: user.email, image: user.image};
};

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    google,
    credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({account, user}) => {
      if (!account || !user) {
        return false;
      }
      if (account.provider === 'google') {
        const dbuser = await prisma.user.findFirst({
          where: {email: user.email!},
        });
        if (dbuser) {
          return true;
        }
        const nameConflict = await prisma.user.findFirst({
          where: {username: user.name!},
        });
        if (nameConflict) {
          user.name = user.name! + Date.now();
        }
        await prisma.user.create({
          data: {
            username: user.name!,
            email: user.email!,
            image: user.image,
          },
        });
      }
      return true;
    },
    session({session}) {
      session.user.isAdmin = true;
      return session;
    },
  },
});
