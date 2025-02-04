import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname;

   const { isAuthorized, cookiesToSet } = await auth();

   // Auth routes
   const authRoutes = ["/login", "/register"];
   if (authRoutes.includes(pathname)) {
      return isAuthorized
         ? NextResponse.redirect(new URL("/", request.url))
         : NextResponse.next();
   }

   // Public routes
   const publicRoutes = ["/", "/client", "/protected"];
   if (publicRoutes.includes(pathname)) return NextResponse.next();

   // Protected routes
   const response = isAuthorized
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));

   // Apply cookies to the response
   cookiesToSet.forEach((cookie) => {
      response.headers.append("Set-Cookie", cookie);
   });

   return response;
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
