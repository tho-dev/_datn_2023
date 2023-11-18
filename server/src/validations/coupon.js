import joi from "joi"

export const couponSchema = joi.object({
	name: joi.string().required(),
	coupon_code: joi.string().required(),
	coupon_value: joi.number().required(),
	coupon_quantity: joi.number().required(),
	status: joi.boolean().default(true),
	coupon_start_date: joi.string().default(null),
	coupon_end_date: joi.any().default(null),
	created_at: joi.string().default(() => new Date()),
	updated_at: joi.string().default(() => new Date()),
})