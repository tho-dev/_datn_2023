import Express from "express"
import { getAllCoupon, createCoupon, deleteCoupon, updateCoupon } from "../controllers/coupon.controller"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"

const router = Express.Router()

router.get("/", getAllCoupon)
router.post('/', [verifyAccessToken, checkPermission], createCoupon)
router.put('/:id', [verifyAccessToken, checkPermission], updateCoupon)
router.delete('/:id', [verifyAccessToken, checkPermission], deleteCoupon)

export default router