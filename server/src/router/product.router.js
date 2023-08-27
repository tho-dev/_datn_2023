import express from "express"
import { getAllProduct, getSingleProduct } from "../controllers/product.controller";

const router = express.Router()

router.get('/', getAllProduct)
router.get('/:slug', getSingleProduct)

export default router
