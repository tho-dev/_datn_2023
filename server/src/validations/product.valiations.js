import joi from "joi"

export const optionValuesSchema = joi.object({
	label: joi.string().required(),
	value: joi.string().required(),
	option_id: joi.string().required(),
	product_id: joi.string().required(),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
});

export const optionSchema = joi.object({
	name: joi.string().required(),
	product_id: joi.string().required(),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
});

export const productSchema = joi.object({
	name: joi.string().required(),
	price: joi.number().required(),
	price_before_discount: joi.number().required(),
	has_gift: joi.boolean().required(),
	gift_amount: joi.number().required(),
	status: joi.boolean().required(),
	video_review: joi.string().allow(""),
	specs: joi.string().allow(""),
	attributes: joi.array().allow(""),
	description: joi.string().required(),
	brand_id: joi.string().required(),
	category_id: joi.string().required(),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
})