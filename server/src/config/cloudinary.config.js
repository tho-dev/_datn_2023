import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "products";
    let width = 1000;
    let height = 1000;
    let url = ''
    let opacity = 100

    if (file.fieldname == "assets") {
      width = 1000;
      height = 1000;
      url = 'https://res.cloudinary.com/do7pjthoe/image/upload/v1698289774/xa7n8cd4nnjqiiqtsg8k.svg'
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
      url = 'https://res.cloudinary.com/do7pjthoe/image/upload/v1698289774/xa7n8cd4nnjqiiqtsg8k.svg'
      opacity = 70
    } else if (file.fieldname == 'banner') {
      width = 1200;
      height = 1200;
      folder = "banner";
      url = ""
    } else if (file.fieldname == 'avatar') {
      width = 200
      height = 200
      folder = 'avatar'
      url = ""
    }
    // #27bece

    const polytech = url ? [{ opacity: opacity, overlay: { url: url, crop: "fit" } },
    { flags: "layer_apply" }] : []

    // crop cắt theo tỉ lệ theo kích thước nó giống object-fit...
    return {
      folder: `polytech/${folder}`,
      allowedFormats: ["jpg", "png"],
      transformation: [
        { width, height, crop: "fit" },
        ...polytech
      ],
    };
  },
});

const uploadCloud = multer({ storage });

export { cloudinary };
export default uploadCloud;
