import express from "express";
import upload from "../config/cloudinary.config.js";

import {
  removeFile,
  uploadFile,
  uploadMultipleFile,
} from "../controllers/upload-image.controller.js";

const router = express.Router();

router.delete("/", removeFile);

router.post("/multiple", upload.fields([{ name: "assets", maxCount: 10 }, { name: "brand", maxCount: 1 }, { name: "category", maxCount: 1 }, { name: "thumbnail", maxCount: 1 }]), uploadMultipleFile);

router.put("/:filename", uploadFile);

export default router;
