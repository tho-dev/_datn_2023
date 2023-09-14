import express from "express"
import { getAllDemand, getOneDemand, updateDemand, createDemand, removeDemand } from "../controllers/demand.controller"


const router = express.Router()

router.get('/', getAllDemand)
router.get('/:slug', getOneDemand)
router.post('/', createDemand)
router.put('/:id', updateDemand)
router.delete('/:id', removeDemand)


export default router