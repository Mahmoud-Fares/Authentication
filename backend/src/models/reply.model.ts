import mongoose, { Document, Schema, Types } from "mongoose";

export type Reply = Document & {
   id: string;
   userId: Types.ObjectId;
   threadId: Types.ObjectId;
   content: string;
   createdAt: Date;
};

const replySchema = new Schema<Reply>({
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
   content: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const ReplyModel = mongoose.model<Reply>("Reply", replySchema);

export default ReplyModel;
