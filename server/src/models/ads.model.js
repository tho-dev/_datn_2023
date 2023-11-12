import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [mongooseDelete, mongoosePaginate];

const adsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    email: [
      {
        type: String,
        required: true,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sendTime: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: {
      type: Date,
      default: null,
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
    collection: "ads",
    timestamps: false,
    versionKey: false,
  }
);
plugins.forEach((item) => adsSchema.plugin(item, { overrideMethods: true }));

export default model("Ads", adsSchema);
