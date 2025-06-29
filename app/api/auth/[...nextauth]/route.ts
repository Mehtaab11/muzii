import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prismaClient } from "@/app/lib/db";

console.log(process.env.GOOGLE_CLIENT_ID);
console.log(process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (!params.user.email) {
        return false; // Prevent sign-in if email is not available
      }
      try {
        await prismaClient.user.create({
          data: {
            email: params.user.email ?? "",
            provider: "Google",
          },
        });
      } catch (error) {
        console.error("Error during sign-in:", error);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
