import express from "express"
import { filterBrandAndCategory } from "../controllers/collection.controller"

const router = express.Router()

router.get("/", filterBrandAndCategory)


export default router