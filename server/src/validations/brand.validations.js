import joi from "joi";

const brandSchema = joi.object({
  category_id: joi.string().required(),
  parent_id: joi.string(),
  name: joi.string().required(),
  thumbnail: joi.object({
    id: joi.string(),
    url: joi.string(),
  }).required(),
  description: joi.string().required(),
  created_at: joi.date().default(() => new Date()),
  updated_at: joi.date().default(() => new Date()),
});

export default brandSchema;
