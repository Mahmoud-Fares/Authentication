import { Response } from "express";
import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.config";
import { TokenPayload } from "../types/auth.types";

type TokenPair = {
   accessToken: string;
   refreshToken: string;
};

export const generateAccessToken = (payload: TokenPayload): string => {
   return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: AUTH_CONFIG.ACCESS_TOKEN_EXPIRY,
   });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: AUTH_CONFIG.REFRESH_TOKEN_EXPIRY,
   });
};

export const generateTokenPair = (payload: TokenPayload): TokenPair => {
   return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload),
   };
};

export const setTokenCookies = (res: Response, tokens: TokenPair): void => {
   res.cookie("accessToken", tokens.accessToken, {
      ...AUTH_CONFIG.COOKIE_OPTIONS,
      maxAge: 15 * 60 * 1000, // 15 minutes
   });

   res.cookie("refreshToken", tokens.refreshToken, {
      ...AUTH_CONFIG.COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
   });
};

export const clearTokenCookies = (res: Response): void => {
   res.clearCookie("accessToken", AUTH_CONFIG.COOKIE_OPTIONS);
   res.clearCookie("refreshToken", AUTH_CONFIG.COOKIE_OPTIONS);
};

export const verifyToken = (token: string, secret: string): TokenPayload => {
   return jwt.verify(token, secret) as TokenPayload;
};
