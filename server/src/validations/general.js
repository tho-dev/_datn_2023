import joi from "joi"

export const generalSchema = joi.object({
	_id: joi.allow(''),
	logo: joi.object({
		id: joi.string(),
		url: joi.string(),
	}).required(),
	meta_title: joi.string().required(),
	meta_keyword: joi.string().required(),
	meta_description: joi.string().required(),
	meta_slug: joi.string().required(),
	banner_title: joi.string().required(),
	banner_description: joi.string().required(),
	banner_color: joi.string().required(),
	banner_background_color: joi.string().required(),
	banner_thumbnail: joi.object({
		id: joi.string(),
		url: joi.string(),
	}).required(),
	branch: joi.array().default([]),
	usp: joi.object().default({}),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
})