import joi from "joi"

export const postSchema = joi.object({
	category_id: joi.string().required(),
	title: joi.string().required(),
	thumbnail: joi.object({
		id: joi.string(),
		url: joi.string(),
	}).required(),
	content: joi.string().required(),
	description: joi.string().required(),
	meta_title: joi.string().required(),
	meta_keyword: joi.string().required(),
	meta_description: joi.string().required(),
	created_by: joi.string().default(null),
	updated_by: joi.string().default(null),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
})