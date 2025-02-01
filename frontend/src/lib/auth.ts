import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { apiPost } from "@/lib/api-client";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
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
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
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
   secret: process.env.NEXTAUTH_SECRET,
   debug: process.env.NODE_ENV !== "production",
};

// For server-side authentication
export const auth = NextAuth(authOptions);
