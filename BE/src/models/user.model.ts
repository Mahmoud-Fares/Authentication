import mongoose, { Document, Schema } from "mongoose";

export type IUser = Document & {
   name: string;
   email: string;
   password: string;
   avatar: string;
   createdAt: Date;
};

const userSchema = new Schema<IUser>({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      unique: true,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   avatar: {
      type: String,
      default: process.env.DEFAULT_AVATAR_MALE,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
