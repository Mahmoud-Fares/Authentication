import mongoose, { Document, Schema, Types } from "mongoose";

export type IThread = Document & {
   userId: Types.ObjectId;
   caption: string;
   createdAt: Date;
};

const threadSchema = new Schema<IThread>({
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   caption: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const ThreadModel = mongoose.model<IThread>("Thread", threadSchema);

export default ThreadModel;
