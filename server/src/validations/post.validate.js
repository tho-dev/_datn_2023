import joi from 'joi';

export const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  author: joi.string().required(),
  public_date: joi.string().default(() => new Date()),
  thumbnail: joi.string().required(),
  views: joi.number(),
  likes: joi.number(),
  comments: joi.string().required(),
  publication_status: joi.string(),
  createdAt: joi.string().default(() => new Date()),
  updatedAt: joi.string().default(() => new Date()),
  deletedAt: joi.date().default(null),
  deleted: joi.boolean().default(false),
});
