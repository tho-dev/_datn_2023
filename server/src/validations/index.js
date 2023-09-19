import joi from 'joi';

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
export const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  author: joi.string().required(),
  public_date: joi.string().required(),
  thumbnail: joi.string().required(),
  views: joi.string().required(),
  likes: joi.string().required(),
  comments: joi.string().required(),
  publication_status: joi.string().required(),
  createdAt: joi.string().default(() => new Date()),
  updatedAt: joi.string().default(() => new Date()),
  deletedAt: joi.date().default(null),
  deleted: joi.boolean().default(false),
});
