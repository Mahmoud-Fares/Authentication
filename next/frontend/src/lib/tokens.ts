import "server-only";

import jwt from "jsonwebtoken";
import { getAuthCookies } from "./cookies";

type decodedUser = { userId: string; email: string };
type payload = decodedUser & {
   iat: number;
   exp: number;
};

export function isTokenExpired(token?: string): boolean {
   if (!token) return true;

   try {
      const { exp } = jwt.decode(token) as payload;

      return Date.now() >= exp * 1000;
   } catch {
      return true;
   }
}

export async function getDecodedUser() {
   const { accessToken } = await getAuthCookies();
   if (!accessToken) return null;

   const { userId, email } = jwt.decode(accessToken) as decodedUser;

   return { userId, email };
}
