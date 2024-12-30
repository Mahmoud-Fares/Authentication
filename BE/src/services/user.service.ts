import User from "../models/user.model";
import customError from "../utils/customError";
import { deleteImage } from "./cloudinary.service";

export const deleteUser = async (userId: string) => {
   const user = await User.findById(userId);
   if (!user) throw customError.create("User not found", 404, "NOT_FOUND");

   await deleteImage(user.avatar);

   await User.findByIdAndDelete(userId);
};
