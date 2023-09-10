import express from "express"
import { getAllProduct, getSingleProduct } from "../controllers/product.controller";

const router = express.Router()

router.get('/', getAllProduct)
router.get('/:slug', getSingleProduct)


export default router


// các api cần tạo ra sản phẩm
/**
 * 1. 
 * 2. 
 * 3. 
 * 4. 
 * 5.
 */
