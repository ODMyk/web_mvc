import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import prisma from "./db";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google],
  callbacks: {
    signIn: async ({account, user}) => {
      if (!account || !user) {
        return false;
      }
      await prisma.user.create({data:{
        username: user.name!,
        email: user.email!,
        image: user.image
      }})
      return true;
    }
  }
})