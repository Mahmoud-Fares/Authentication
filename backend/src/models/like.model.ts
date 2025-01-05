import mongoose, { Document, Schema, Types } from "mongoose";

export type Like = Document & {
   id: string;
   userId: Types.ObjectId;
   threadId: Types.ObjectId;
   createdAt: Date;
};

const likeSchema = new Schema<Like>({
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   threadId: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const LikeModel = mongoose.model<Like>("Like", likeSchema);

export default LikeModel;
