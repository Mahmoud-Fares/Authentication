import mongoose, { Document, Schema, Types } from "mongoose";

export type Thread = Document & {
   id: string;
   authorId: Types.ObjectId;
   caption: string;
   createdAt: Date;
   images?: string[];
};

const threadSchema = new Schema<Thread>({
   authorId: {
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
   images: [{ type: String }],
});

const ThreadModel = mongoose.model<Thread>("Thread", threadSchema);

export default ThreadModel;
