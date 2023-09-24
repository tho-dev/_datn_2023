import { Schema, model } from "mongoose";

const resetPassWordSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    otp_code: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 300 },
  },
  {
    collection: "resetPassWord",
  }
);

export default model("resetPassWord", resetPassWordSchema);
