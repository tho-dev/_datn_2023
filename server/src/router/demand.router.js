import express from "express"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import { getAllDemand, getOneDemand, updateDemand, createDemand, removeDemand } from "../controllers/demand.controller"


const router = express.Router()

router.get('/', getAllDemand)
router.get('/:slug', getOneDemand)

router.post('/', [verifyAccessToken, checkPermission], createDemand)
router.put('/:id', [verifyAccessToken, checkPermission], updateDemand)
router.delete('/:id', [verifyAccessToken, checkPermission], removeDemand)


export default router