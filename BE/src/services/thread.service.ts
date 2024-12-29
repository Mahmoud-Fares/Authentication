import ThreadModel, { Thread } from "../models/thread.model";
import User from "../models/user.model";
import { Types } from "mongoose";
import customError from "../utils/customError";

export type CreateThreadData = {
   authorId: Types.ObjectId;
   caption: string;
};

export const createThread = async (data: CreateThreadData): Promise<Thread> => {
   if (data.caption.length === 0)
      throw customError.create("Caption is required", 400, "BAD_REQUEST");

   const user = await User.findById(data.authorId);
   if (!user) throw customError.create("User not found", 404, "NOT_FOUND");

   const newThread = await ThreadModel.create(data);
   return newThread;
};
