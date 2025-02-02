import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;

   const { isAccessTokenExpired, isRefreshTokenExpired, refreshTheTokens } =
      await auth();

   // Auth routes
   const authRoutes = ["/login", "/register"];
   if (authRoutes.includes(pathname)) {
      if (!isRefreshTokenExpired)
         return NextResponse.redirect(new URL("/", request.url));

      return NextResponse.next();
   }

   // Public routes
   const publicRoutes = ["/", "/client"];
   if (publicRoutes.includes(pathname)) return NextResponse.next();

   // Protected routes
   if (isRefreshTokenExpired && pathname !== "/login")
      return NextResponse.redirect(new URL("/login", request.url));

   // When access token is expired and refresh token is valid, refresh the tokens
   if (!isRefreshTokenExpired && isAccessTokenExpired) {
      try {
         const newCookies = await refreshTheTokens();
         const response = NextResponse.next();

         newCookies.forEach((cookie) => {
            response.headers.append("Set-Cookie", cookie);
         });

         return response;
      } catch (error) {
         return NextResponse.redirect(new URL("/login", request.url));
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
