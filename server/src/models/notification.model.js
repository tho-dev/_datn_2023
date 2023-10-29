import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

const notificationSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receivers_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
    link: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Notification",
    timestamps: false,
    versionKey: false,
  }
);

plugins.forEach((item) =>
  notificationSchema.plugin(item, { overrideMethods: true })
);

const Notification = model("Notification", notificationSchema);
export default Notification;
