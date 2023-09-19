import Joi from "joi";

const brandSchema = Joi.object({
  category_id: Joi.string().required(),
  sub_brands: Joi.array().items(Joi.string()),
  name: Joi.string().required(),
  slug: Joi.string().required(),
  thumbnail: Joi.object({
    id: Joi.string(),
    url: Joi.string(),
  }).required(),
  description: Joi.string(),
  deleted: Joi.boolean().default(false),
  deleted_at: Joi.date().allow(null).default(null), // Chấp nhận null cho deleted_at
  created_at: Joi.date().default(() => new Date()),
  updated_at: Joi.date().default(() => new Date()),
});

export default brandSchema;
