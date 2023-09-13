import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required(),
  slug: joi.string().required(),
  price: joi.number().required(),
  discount: joi.number().allow(null),
  thumbnail: joi.object().required(),
  assets: joi.array().default([]),
  description: joi.string(),
  attributes: joi.array().default([]),
  status: joi.number().default(0),
  brandId: joi.string().allow(null),
  categoryId: joi.string().allow(null).required(),
  createdAt: joi.string().default(() => new Date()),
  updatedAt: joi.string().default(() => new Date()),
  deletedAt: joi.date().default(null),
  deleted: joi.boolean().default(false),
});

export const userSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required().min(6),
  confirm_password: joi.string().required().valid(joi.ref("password")),
  phone: joi.number().required(),
  avatar: joi.string(),
  location: joi.string(),
  role: joi.string().default("customer"),
  createdAt: joi.string().default(() => new Date()),
  updatedAt: joi.string().default(() => new Date()),
  deletedAt: joi.date().default(null),
  deleted: joi.boolean().default(false),
});
