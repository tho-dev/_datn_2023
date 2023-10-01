import joi from "joi"

export const categorySchema = joi.object({
	name: joi.string().required(),
	type: joi.string().required(),
	thumbnail: joi.object({
		id: joi.string(),
		url: joi.string(),
	}).required(),
	parent_id: joi.string(),
	description: joi.string().required(),
	created_at: joi.string().default(() => new Date()),
	update_at: joi.string().default(() => new Date()),
})