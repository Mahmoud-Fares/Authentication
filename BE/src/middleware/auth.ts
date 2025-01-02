import { Response, NextFunction } from "express";
import { verifyToken } from "../services/token.service";
import customError from "../utils/customError";
import { AuthRequest, TokenPayload } from "../types/auth.types";

export const auth = (
   req: AuthRequest,
   _res: Response,
   next: NextFunction
): void => {
   // First check if user is authenticated via OAuth session
   if (req.isAuthenticated()) return next();

   // If not OAuth, verify JWT token
   const accessToken = req.cookies.accessToken;
   if (!accessToken)
      throw customError.create("Authentication required", 401, "UNAUTHORIZED");

   try {
      const currentUserPayload = verifyToken(
         accessToken,
         process.env.ACCESS_TOKEN_SECRET!
      ) as TokenPayload;

      req.currentUserPayload = currentUserPayload;
      next();
   } catch (err) {
      throw customError.create("Invalid authentication", 401, "UNAUTHORIZED");
   }
};
