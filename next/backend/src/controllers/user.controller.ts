import { Request, Response } from "express";
import User from "../models/user.model";
import { deleteUser } from "../services/user.service";
import { AuthRequest } from "../types/auth.types";
import { apiResponse } from "../utils/apiResponse";
import { asyncWrapper } from "../utils/asyncWrapper";
import customError from "../utils/customError";

type QueryParams = {
   limit?: string;
   page?: string;
};

const getUsers = asyncWrapper(
   async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
      const query = req.query;
      const limit = parseInt(query.limit || "10");
      const page = parseInt(query.page || "1");
      const skip = (page - 1) * limit;

      const users = await User.find().limit(limit).skip(skip);

      const total = await User.countDocuments();

      return apiResponse.paginated({
         data: { users },
         message: "Users retrieved successfully",
         page,
         limit,
         total,
         res,
      });
   }
);

const deleteUserById = asyncWrapper(async (req: AuthRequest, res: Response) => {
   const { id } = req.params;
   const { userId } = req.currentUserPayload!;

   // Check if user is deleting their own account
   if (id !== userId)
      throw customError.create(
         "You can only delete your own account",
         403,
         "FORBIDDEN"
      );

   await deleteUser(id);

   return apiResponse.success({
      message: "User deleted successfully",
      res,
   });
});

export default {
   getUsers,
   deleteUserById,
};
