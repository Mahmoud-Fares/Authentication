import "server-only";

import { deleteAuthCookies, getAuthCookies } from "./lib/cookies";
import { getDecodedUser, isTokenExpired } from "./lib/tokens";

async function handleRefreshTheTokens(refreshToken: string): Promise<string[]> {
   const refreshResponse = await fetch(
      "http://localhost:5000/api/auth/refresh",
      {
         method: "GET",
         headers: {
            Cookie: `refreshToken=${refreshToken}`,
         },
      }
   );

   if (!refreshResponse.ok) {
      throw new Error("Failed to refresh tokens");
   }

   return refreshResponse.headers.getSetCookie();
}

type AuthResponse = {
   isAuthorized: boolean;
   cookiesToSet: string[];
   user: Awaited<ReturnType<typeof getDecodedUser>>;
};
export async function auth(): Promise<AuthResponse> {
   const { accessToken, refreshToken } = await getAuthCookies();

   // Case 1: No tokens available
   if (!accessToken && !refreshToken) {
      return {
         isAuthorized: false,
         cookiesToSet: [],
         user: null,
      };
   }

   const isAccessTokenExpired = isTokenExpired(accessToken);
   const isRefreshTokenExpired = isTokenExpired(refreshToken);

   // Case 2: Refresh token is expired - clear everything
   if (isRefreshTokenExpired) {
      const deleteCookies = await deleteAuthCookies();
      return {
         isAuthorized: false,
         cookiesToSet: deleteCookies,
         user: null,
      };
   }

   // Case 3: Access token expired but refresh token valid - attempt refresh
   if (isAccessTokenExpired) {
      try {
         const newCookies = await handleRefreshTheTokens(refreshToken!);
         return {
            isAuthorized: true,
            cookiesToSet: newCookies,
            user: await getDecodedUser(),
         };
      } catch (error) {
         const deleteCookies = await deleteAuthCookies();
         return {
            isAuthorized: false,
            cookiesToSet: deleteCookies,
            user: null,
         };
      }
   }

   // Case 4: Both tokens are valid
   return {
      isAuthorized: true,
      cookiesToSet: [],
      user: await getDecodedUser(),
   };
}
