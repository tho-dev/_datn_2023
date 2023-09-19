import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        variants: {
          type: Schema.Types.ObjectId,
          ref: "Sku",
        },
        quantity: Number,
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, default: 0 },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    deletedAt: {
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
