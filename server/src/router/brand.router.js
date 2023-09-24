import express from "express"

import { getAllBrand, getOneBrand, create, updateBrand, removeBrand, restore } from "../controllers/brand.controller"

const router = express.Router()

router.get('/', getAllBrand) 
router.get("/:id", getOneBrand)
router.post('/', create)
router.put('/:id', updateBrand)
router.delete('/:id', removeBrand)
router.patch("/:id", restore);


export default router