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
  params: async (req, file) => {
    let folder = "products";
    let width = 460;
    let height = 460;

    if (file.fieldname === "assets") {
      width = 200;
      height = 200;
    } else if (file.fieldname == "brand") {
      width = 68;
      height = 68;
      folder = "brands";
    } else if (file.fieldname === "images" || file.fieldname === "thumbnail") {
      width = 96;
      height = 96;
      folder = "categories";
    }

    // crop cắt theo tỉ lệ theo kích thước nó giống object-fit...
    return {
      folder: `thinkpro/${folder}`,
      allowedFormats: ["jpg", "png"],
      transformation: [{ width, height, crop: "fit" }],
    };
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images", 10), uploadImage);
router.delete("/delete/:publicId", deleteImage);

export default router;
