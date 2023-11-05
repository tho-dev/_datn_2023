import joi from "joi"

export const promotionSchema = joi.object({
	name: joi.string().required(),
	thumbnail: joi.object({
		id: joi.string(),
		url: joi.string(),
	}).required(),
	description: joi.string().required(),
	status: joi.boolean().default(true),
	items: joi.array().default([]),
	seo: joi.object().default({}),
	start_time: joi.string().default(null),
	expired_time: joi.any().default(null),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
})

export const promotionValueSchema = joi.object({
	promotion_id: joi.string().required(),
	sku_id: joi.string().required(),
	product_id: joi.string().required()
})