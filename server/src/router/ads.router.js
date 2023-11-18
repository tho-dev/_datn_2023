import express from "express";
import {
  createAds,
  deleteAds,
  getAllAds,
  getOneAds,
} from "../controllers/ads.controller";

const router = express.Router();

router.post("/", createAds);
router.get("/", getAllAds);
router.get("/:id", getOneAds);
router.delete("/:jobId", deleteAds);

export default router;
