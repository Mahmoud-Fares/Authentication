import mongoose, { Document, Schema } from "mongoose";

export type IUser = Document & {
   name: string;
   email: string;
   password?: string;
   avatar: string;
   createdAt: Date;
   googleId?: string;
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
      required: function () {
         return !this.googleId; // Password only required if not Google auth
      },
   },
   avatar: {
      type: String,
      default: process.env.DEFAULT_AVATAR_MALE,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   googleId: {
      type: String,
   },
});

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
