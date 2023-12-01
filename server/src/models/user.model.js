import { Schema, model } from "mongoose";
import mongooseDelete from "mongoose-delete";
import mongoosePaginate from "mongoose-paginate-v2";

const plugins = [mongooseDelete, mongoosePaginate];

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default: "user",
    },
    last_name: {
      type: String,
      default: "anonymous",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirm_password: {
      type: String,
      required: true,
    },
    phone: { type: Number, required: true },
    location: {
      type: String,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "manager", "expert", "admin"],
    },
    is_block: {
      type: Boolean,
      default: false,
    },
    date_of_birth: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    avatar: {
      id: String,
      url: String
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
    provider_user: {
      type: String,
      default: "credentials",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: false,
    versionKey: false,
  }
);
plugins.forEach((item) => userSchema.plugin(item, { overrideMethods: true }));

export default model("User", userSchema);
