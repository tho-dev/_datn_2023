import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

import {
  deleteImage,
  uploadImage,
} from "../controllers/uploadImage.controller";

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "WE17301",
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images", 10), uploadImage);
router.delete("/delete/:publicId", deleteImage);

export default router;
