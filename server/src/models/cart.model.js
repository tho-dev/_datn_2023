import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        sku_id: {
          type: Schema.Types.ObjectId,
          ref: "Sku",
        },
        quantity: Number,
        price: { type: Number, required: true },
        price_before_discount: {
          type: Number,
          default: 0,
        },
        price_discount_percent: {
          type: Number,
          default: 0,
        },
      },
    ],
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
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

export { Cart };
