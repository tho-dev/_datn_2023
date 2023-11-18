import express from "express"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import { getAllBrand, getOneBrand, createBrand, updateBrand, removeBrand } from "../controllers/brand.controller"

const router = express.Router()

router.get('/', getAllBrand)
router.get("/:id", getOneBrand)
router.post('/', [verifyAccessToken, checkPermission], createBrand)
router.put('/:id', [verifyAccessToken, checkPermission], updateBrand)
router.delete('/:id', [verifyAccessToken, checkPermission], removeBrand)


export default router