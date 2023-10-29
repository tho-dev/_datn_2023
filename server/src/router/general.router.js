import Express from "express"
import { getGeneral, createGeneral, updateGeneral, homeSettings } from "../controllers/general.controller"

const router = Express.Router()

router.get('/home-settings', homeSettings)
router.get('/general', getGeneral)
router.post('/general', createGeneral)
router.put('/general', updateGeneral)

export default router