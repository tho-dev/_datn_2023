import Express from "express"
import { getAllPromotion, getPromtionDetail, updatePromotion, createPromotion, removePromotion } from "../controllers/promotion.controller"

const router = Express.Router()

router.get('/detail', getPromtionDetail)
router.get('/', getAllPromotion)
router.post('/', createPromotion)
router.put('/:id', updatePromotion)
router.delete('/:id', removePromotion)

export default router