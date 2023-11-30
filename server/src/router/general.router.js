import Express from "express"
import { verifyAccessToken } from "../middleware/jwt.middleware"
import { checkPermission } from "../middleware/check-permission.middleware"
import { getGeneral, createGeneral, updateGeneral, homeSettings, getAllMonth } from "../controllers/general.controller"

const router = Express.Router()


router.get('/home-settings', homeSettings)
router.get('/general', getGeneral)
router.get('/getall-month', getAllMonth)

router.post('/general', [verifyAccessToken, checkPermission], createGeneral)
router.put('/general', [verifyAccessToken, checkPermission], updateGeneral)

export default router