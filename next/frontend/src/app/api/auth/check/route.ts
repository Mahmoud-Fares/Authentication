import { auth } from "@/auth";
import { NextResponse } from "next/server";

// it checks the auth status and changes the tokens if needed
export async function GET() {
   try {
      const { isAuthorized, cookiesToSet } = await auth();

      if (!isAuthorized) return Response.redirect("/login");

      const response = NextResponse.json({ isAuthorized });

      // Apply cookies from token refresh (if any)
      cookiesToSet.forEach((cookie) => {
         response.headers.append("Set-Cookie", cookie);
      });

      return response;
   } catch (error: any) {
      return Response.json(
         { error: error.response?.data?.message || error.message },
         { status: error.response?.status || 500 }
      );
   }
}
