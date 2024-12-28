import { Request, Response, NextFunction } from "express";
import { apiResponse } from "../utils/apiResponse";

interface CustomError extends Error {
   statusCode?: number;
}

const errorHandler = (
   error: CustomError,
   _req: Request,
   res: Response,
   _next: NextFunction
): void => {
   const statusCode = error.statusCode || 500;
   const message = error.message || "Internal Server Error";

   apiResponse.error({
      code: statusCode,
      message: message,
      res,
   });
};

export default errorHandler;
