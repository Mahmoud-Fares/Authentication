import "server-only";

import { cookies } from "next/headers";

export const getAuthCookies = async () => {
   const cookieStore = await cookies();

   return {
      accessToken: cookieStore.get("accessToken")?.value,
      refreshToken: cookieStore.get("refreshToken")?.value,
   };
};

export const deleteAuthCookies = async () => {
   const cookieStore = await cookies();

   cookieStore.delete("accessToken");
   cookieStore.delete("refreshToken");
};
