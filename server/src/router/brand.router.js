import express from "express"
import { getAllBrand, getOneBrand, createBrand, updateBrand, removeBrand } from "../controllers/brand.controller"

const router = express.Router()

router.get('/', getAllBrand)
router.get("/:id", getOneBrand)
router.post('/', createBrand)
router.put('/:id', updateBrand)
router.delete('/:id', removeBrand)


export default router