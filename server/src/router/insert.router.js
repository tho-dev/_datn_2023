import express from "express"
import { insertData, insertProduct, insertVariants } from "../controllers/insert.controller"

const router = express.Router()

router.post("/", insertData)
router.post("/products", insertProduct)
router.post("/variants", insertVariants)


export default router