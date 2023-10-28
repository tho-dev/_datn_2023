import Express from "express"
import { getGeneral, createGeneral, updateGeneral } from "../controllers/general.controller"

const router = Express.Router()

router.get('/general', getGeneral)
router.post('/general', createGeneral)
router.put('/general', updateGeneral)

export default router