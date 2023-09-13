import mongoose, { Schema } from "mongoose";

const userVerificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  uniqueString: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  expires_at: {
    type: Date,
  },
});

export default mongoose.model("userVerification", userVerificationSchema);
