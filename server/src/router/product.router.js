import express from "express";
import {
  getAllProduct,
  getSingleProduct,
  compeareProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/:slug", getSingleProduct);
router.post("/compare", compeareProduct);

export default router;

// các api cần tạo ra sản phẩm
/**
 * 1.
 * 2.
 * 3.
 * 4.
 * 5.
 */
