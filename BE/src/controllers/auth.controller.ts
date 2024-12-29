import { Request, Response } from "express";
import {
   login as authLogin,
   refresh as authRefresh,
   register as authRegister,
   LoginData,
   RegisterData,
} from "../services/auth.service";
import { clearTokenCookies, setTokenCookies } from "../services/token.service";
import { AuthRequest } from "../types/auth.types";
import { apiResponse } from "../utils/apiResponse";
import { asyncWrapper } from "../utils/asyncWrapper";
import customError from "../utils/customError";
import { validateLogin, validateRegister } from "../validators/auth.validator";

const register = asyncWrapper(async (req: Request, res: Response) => {
   const validatedData = validateRegister(req.body) as RegisterData;
   const { user, tokens } = await authRegister({
      data: validatedData,
      avatar: req.file?.filename,
   });

   setTokenCookies(res, tokens);

   return apiResponse.success({
      code: 201,
      data: { user },
      message: "User registered successfully",
      res,
   });
});

const login = asyncWrapper(async (req: Request, res: Response) => {
   const validatedData = validateLogin(req.body) as LoginData;
   const { user, tokens } = await authLogin(validatedData);

   setTokenCookies(res, tokens);
   return apiResponse.success({
      data: { user },
      message: "Logged in successfully",
      res,
   });
});

const refresh = asyncWrapper(async (req: AuthRequest, res: Response) => {
   const refreshToken = req.cookies.refreshToken;
   if (!refreshToken)
      throw customError.create("No refresh token", 401, "UNAUTHORIZED");

   const { tokens } = await authRefresh(refreshToken);
   setTokenCookies(res, tokens);

   return apiResponse.success({
      message: "Token refreshed successfully",
      res,
   });
});

const logout = asyncWrapper(async (_req: Request, res: Response) => {
   clearTokenCookies(res);

   return apiResponse.success({
      message: "User logged out successfully",
      res,
   });
});

export default {
   register,
   login,
   refresh,
   logout,
};
