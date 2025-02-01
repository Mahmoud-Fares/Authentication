import { apiPost } from "@/lib/api-client";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials): Promise<User | null> {
            try {
               const { data } = await apiPost<any>(
                  "/api/auth/login",
                  credentials
               );
               return data.user || null;
            } catch (error) {
               return null;
            }
         },
      }),
      Google,
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.user = user;
         }
         return token;
      },
      async session({ session, token }) {
         session.user = token.user as any;

         return session;
      },
   },
   pages: {
      signIn: "/login",
   },
   secret: process.env.AUTH_SECRET,
   debug: process.env.NODE_ENV !== "production",
});
