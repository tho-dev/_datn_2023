import Express from "express"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import { getAllPromotion, getPromtionDetail, updatePromotion, createPromotion, removePromotion } from "../controllers/promotion.controller"

const router = Express.Router()

router.get('/detail', getPromtionDetail)
router.get('/', getAllPromotion)
router.post('/', [verifyAccessToken, checkPermission], createPromotion)
router.put('/:id', [verifyAccessToken, checkPermission], updatePromotion)
router.delete('/:id', [verifyAccessToken, checkPermission], removePromotion)

export default router