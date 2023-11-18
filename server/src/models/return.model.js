import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

const returnedSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    reason: {
      type: String,
      required: true,
    },
    is_confirm: {
      type: Boolean,
      default: false,
    },
    customer_name: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    images: [],
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
    collection: "returned",
    timestamps: false,
    versionKey: false,
  }
);

plugins.forEach((item) =>
  returnedSchema.plugin(item, { overrideMethods: true })
);

const Returned = model("Returned", returnedSchema);
export default Returned;
