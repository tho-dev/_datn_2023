import express from "express";
import { verifyAccessToken } from "../middleware/jwt.middleware";
import { checkPermission } from "../middleware/check-permission.middleware";
import {
  createAds,
  deleteAds,
  getAllAds,
  getOneAds,
} from "../controllers/ads.controller";

const router = express.Router();

router.post("/", [(verifyAccessToken, checkPermission)], createAds);
router.get("/", [(verifyAccessToken, checkPermission)], getAllAds);
router.get("/:id", [(verifyAccessToken, checkPermission)], getOneAds);
router.delete("/:jobId", [(verifyAccessToken, checkPermission)], deleteAds);

export default router;
