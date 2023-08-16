import express from "express"
import { getAllProduct } from "../controllers/example.controller";

const router = express.Router()

router.get('/', getAllProduct)

export default router
