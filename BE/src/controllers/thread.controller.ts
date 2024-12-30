import { Response } from "express";
import { createThread } from "../services/thread.service";
import { asyncWrapper } from "../utils/asyncWrapper";
import { apiResponse } from "../utils/apiResponse";
import { AuthRequest } from "../types/auth.types";
import { Types } from "mongoose";

const createThreadController = asyncWrapper(
   async (req: AuthRequest, res: Response) => {
      const { caption } = req.body;

      // Since auth middleware guarantees currentUserPayload exists
      const { userId } = req.currentUserPayload!;

      const imageUrls = req.files
         ? (req.files as Express.Multer.File[]).map((file) => file.path)
         : [];

      const thread = await createThread({
         authorId: new Types.ObjectId(userId),
         caption,
         images: imageUrls,
      });

      return apiResponse.success({
         code: 201,
         data: { thread },
         message: "Thread created successfully",
         res,
      });
   }
);

export default { createThreadController };
