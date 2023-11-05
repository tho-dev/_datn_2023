import createError from "http-errors";
import { cloudinary } from "../config/cloudinary.config";

export async function uploadMultipleFile(req, res, next) {
  try {
    if (!req.files) {
      throw createError.BadRequest("Vui lòng nhập file !!!");
    }

    let images = req?.files["brand"] || req?.files["assets"] || req?.files["category"] || req?.files["thumbnail"] || req?.files["banner"] || req?.files["avatar"];

    images = images?.map((img, index) => {
      return {
        url: img?.path,
        id: img?.filename,
      };
    });

    return res.json({
      status: 201,
      message: "Thành Công",
      data: images,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeFile(req, res, next) {
  try {
    const filename = req.query.filename;
    await cloudinary.uploader.destroy(filename);


    return res.json({
      status: 200,
      messsage: "Thành Công",
    });

  } catch (error) {
    next(error);
  }
}

export async function uploadFile(req, res, next) {
  try {
    if (!req.file.path) {
      throw createError.BadRequest("Vui lòng nhập file !!!");
    }

    const filename = req.params.filename;
    await cloudinary.uploader.destroy(filename);

    return res.json({
      status: 200,
      message: "Thành Công",
      data: req.file.path,
    });
  } catch (error) {
    next(error);
  }
}