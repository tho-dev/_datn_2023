import express from "express"
import { filterBrandAndCategory, collectionProducts } from "../controllers/collection.controller"

const router = express.Router()

router.get("/", filterBrandAndCategory)
router.get('/products', collectionProducts)


export default router