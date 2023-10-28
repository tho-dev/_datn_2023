import express from "express";
import {
  getAll,
  addNoti,
  getAllByUserId,
  updateNoti,
} from "../controllers/notification.controller";

const router = express.Router();

router.get("/", getAll);
router.get("/:user_id", getAllByUserId);
router.post("/", addNoti);
router.put("/:id", updateNoti);

export default router;
