import express from "express"
import { getAllBrand } from "../controllers/brand.controller"

const router = express.Router()

router.get('/', getAllBrand)

export default router