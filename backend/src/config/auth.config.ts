import { CookieOptions } from "express";

type AuthConfig = {
   ACCESS_TOKEN_EXPIRY: string;
   REFRESH_TOKEN_EXPIRY: string;
   COOKIE_OPTIONS: CookieOptions;
};

export const AUTH_CONFIG: AuthConfig = {
   ACCESS_TOKEN_EXPIRY: ".1m",
   REFRESH_TOKEN_EXPIRY: ".5m",
   COOKIE_OPTIONS: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
   },
};
