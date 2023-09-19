import express from "express";
import {
  addCart,
  getCart,
  deleteProduct,
  deleteCart,
} from "../controllers/cart.controller";

const router = express.Router();

router.post("/", addCart);
router.get("/", getCart);
router.delete("/:id", deleteProduct);
router.delete("/delete/:id", deleteCart);

export default router;
