import express from "express"
import { getAllDemand } from "../controllers/demand.controller"


const router = express.Router()

router.get('/', getAllDemand)

export default router