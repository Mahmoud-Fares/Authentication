import mongoose, { Document, Schema, Types } from "mongoose";

export type Follow = Document & {
   followerId: Types.ObjectId;
   followingId: Types.ObjectId;
   createdAt: Date;
};

const followSchema = new Schema<Follow>({
   followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
         validator: function (this: Follow, followerId: Types.ObjectId) {
            return !this.followingId?.equals(followerId);
         },
         message: "Users cannot follow themselves",
      },
   },
   followingId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

// Create a compound index to ensure a user can't follow another user multiple times
followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

const FollowModel = mongoose.model<Follow>("Follow", followSchema);

export default FollowModel;
