import { Request, Response } from "express";
import User from "../models/user.model";
import { apiResponse } from "../utils/apiResponse";
import { asyncWrapper } from "../utils/asyncWrapper";

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

export default {
   getUsers,
};
