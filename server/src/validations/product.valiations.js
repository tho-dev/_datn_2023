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