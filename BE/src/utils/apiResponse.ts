import { Response } from "express";

type ApiSuccessResponse = {
   code?: number;
   data?: any;
   message?: string;
   res: Response;
};

export type ApiErrorResponse = {
   code?: number;
   message?: string;
   res: Response;
};

type PaginatedResponse = ApiSuccessResponse & {
   page: number;
   limit: number;
   total: number;
};

export const apiResponse = {
   success: ({
      code = 200,
      data = null,
      message = "Success",
      res,
   }: ApiSuccessResponse): Response => {
      return res.status(code).json({
         success: true,
         code,
         message,
         ...(data && { data }),
      });
   },

   error: ({
      code = 500,
      message = "Something went wrong",
      res,
   }: ApiErrorResponse): Response => {
      return res.status(code).json({
         success: false,
         code,
         message,
      });
   },

   paginated: ({
      code = 200,
      data,
      page,
      limit,
      total,
      message = "Success",
      res,
   }: PaginatedResponse): Response => {
      return res.status(code).json({
         success: true,
         code,
         message,
         data,
         pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
         },
      });
   },
};
