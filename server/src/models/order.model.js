import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const plugins = [mongoosePaginate, mongooseDelete];

const orderItemSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    sku_id: {
      type: Schema.Types.ObjectId,
      ref: "Sku",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price_before_discount: {
      type: Number,
      default: 0,
    },
    price_discount_percent: {
      type: Number,
      default: 0,
    },
    total_money: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "order_details",
    timestamps: false,
    versionKey: false,
  }
);

const shippingInfoSchema = new Schema(
  {
    shipping_address: {
      type: String,
      required: true,
    },
    estimated_delivery_date: Date,
    shipping_company: {
      type: String,
      default: "Giao hàng nhanh",
    },
    transportation_fee: {
      type: Number,
      default: 0,
    },
    order_code: {
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
    collection: "shippings",
    timestamps: false,
    versionKey: false,
  }
);

const orderSchema = new Schema(
  {
    customer_name: {
      type: String,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shop_address: {
      type: String,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    payment_method: {
      type: Object,
    },
    status: {
      type: String,
      default: "processing",
      enum: [
        "processing",
        "confirmed",
        "delivering",
        "cancelled",
        "delivered",
        "returned",
      ],
    },
    status_detail: [
      {
        status: {
          type: String,
          default: "processing",
          enum: [
            "processing",
            "confirmed",
            "delivering",
            "cancelled",
            "delivered",
            "returned",
          ],
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    date_issued: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
    },
    shipping_method: {
      type: String,
      enum: ["shipped", "at_store"],
      default: "at_store",
    },
    shipping_info: {
      type: Schema.Types.ObjectId,
      ref: "Shipping",
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "orders",
    timestamps: false,
    versionKey: false,
  }
);

plugins.forEach((item) => orderSchema.plugin(item, { overrideMethods: true }));

const Order = model("Order", orderSchema);
const Shipping = model("Shipping", shippingInfoSchema);
const Order_Detail = model("OrderDetail", orderItemSchema);
export { Order, Shipping, Order_Detail };
