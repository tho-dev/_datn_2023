import express from "express";
import {
  addCart,
  getCart,
  deleteProduct,
  deleteCart,
  deleteOneProduct,
} from "../controllers/cart.controller";

const router = express.Router();

router.post("/", addCart);
router.get("/", getCart);
router.delete("/:id", deleteProduct);
router.delete("/delete/:id", deleteCart);
router.delete("/deleteOne/:id", deleteOneProduct);

export default router;
