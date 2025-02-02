import "server-only";

import { deleteAuthCookies, getAuthCookies } from "./lib/cookies";
import { getDecodedUser, isTokenExpired } from "./lib/tokens";

async function handleRefreshTheTokens(refreshToken: string) {
   try {
      const refreshResponse = await fetch(
         "http://localhost:5000/api/auth/refresh",
         {
            method: "GET",
            headers: {
               Cookie: `refreshToken=${refreshToken}`,
            },
         }
      );

      if (!refreshResponse.ok) throw new Error("Failed to refresh tokens");

      const newCookies = refreshResponse.headers.getSetCookie();
      return newCookies;
   } catch (error) {
      await deleteAuthCookies();
      throw error;
   }
}

export async function auth() {
   const { accessToken, refreshToken } = await getAuthCookies();

   const isAccessTokenExpired = isTokenExpired(accessToken);
   const isRefreshTokenExpired = isTokenExpired(refreshToken);

   const user = await getDecodedUser();
   const refreshTheTokens = async () => {
      if (!refreshToken) throw new Error("No refresh token available");
      return await handleRefreshTheTokens(refreshToken);
   };

   return {
      isAccessTokenExpired,
      isRefreshTokenExpired,
      refreshTheTokens,
      user,
   };
}
