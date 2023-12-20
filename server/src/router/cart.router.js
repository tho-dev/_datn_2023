import express from "express";
import {
  addCart,
  addOneProduct,
  getCart,
  deleteProduct,
  deleteCart,
  deleteOneProduct,
  getCartByUserId,
  createCart,
  deleteAllCart,
  checkStockSku,
} from "../controllers/cart.controller";

const router = express.Router();

router.delete("/deleteAllCart", deleteAllCart);
router.post("/create", createCart);
router.post("/", addCart);
router.post("/check_stock/:cart_id", checkStockSku);
router.get("/:cart_id", getCart);
router.post("/user/:user_id", getCartByUserId);
router.delete("/:sku_id", deleteProduct);
router.delete("/delete/:id", deleteCart);
router.delete("/deleteOne/:sku_id", deleteOneProduct);
router.post("/addOne/:sku_id", addOneProduct);

export default router;
