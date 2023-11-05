import Express from "express"
import { getAllPromotion, getPromtionDetail, updatePromotion, createPromotion } from "../controllers/promotion.controller"

const router = Express.Router()

router.get('/detail', getPromtionDetail)
router.get('/', getAllPromotion)
router.post('/', createPromotion)
router.put('/:id', updatePromotion)

export default router