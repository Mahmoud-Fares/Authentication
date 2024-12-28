import { Response, NextFunction } from "express";
import { verifyToken } from "../services/token.service";
import customError from "../utils/customError";
import { AuthRequest, TokenPayload } from "../types/auth.types";

export const auth = (
   req: AuthRequest,
   _res: Response,
   next: NextFunction
): void => {
   const accessToken = req.cookies.accessToken;

   if (!accessToken)
      throw customError.create("token is required", 401, "ERROR");

   try {
      const currentUserPayload = verifyToken(
         accessToken,
         process.env.ACCESS_TOKEN_SECRET!
      ) as TokenPayload;

      req.currentUserPayload = currentUserPayload;
      next();
   } catch (err) {
      throw customError.create("invalid token", 401, "ERROR");
   }
};
