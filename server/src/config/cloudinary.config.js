import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dbhyz5cgb",
  api_key: "736468232726189",
  api_secret: "4gaPgk7wF-l4aC5MPvDUX3Px8WI",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "products";
    let width = 1000;
    let height = 1000;

    if (file.fieldname == "assets") {
      width = 1000;
      height = 1000;
    } else if (file.fieldname == "brand") {
      width = 120;
      height = 120;
      folder = "brands";
    } else if (file.fieldname == "category") {
      width = 120;
      height = 120;
      folder = "categories";
    } else if (file.fieldname == "thumbnail") {
      width = 460;
      height = 460;
    }

    // crop cắt theo tỉ lệ theo kích thước nó giống object-fit...
    return {
      folder: `thinkpro/${folder}`,
      allowedFormats: ["jpg", "png"],
      transformation: [{ width, height, crop: "fit" }],
    };
  },
});

const uploadCloud = multer({ storage });

export { cloudinary };
export default uploadCloud;
