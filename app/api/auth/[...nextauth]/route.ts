import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prismaClient } from "@/app/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET ?? "secret",
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
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
