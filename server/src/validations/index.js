import joi from "joi"

export const productSchema = joi.object({
	name: joi.string().required(),
	slug: joi.string().required(),
	price: joi.number().required(),
	discount: joi.number().allow(null),
	thumbnail: joi.object().required(),
	assets: joi.array().default([]),
	description: joi.string(),
	attributes: joi.array().default([]),
	status: joi.number().default(0),
	brandId: joi.string().allow(null),
	categoryId: joi.string().allow(null).required(),
	createdAt: joi.string().default(() => new Date()),
	updatedAt: joi.string().default(() => new Date()),
	deletedAt: joi.date().default(null),
	deleted: joi.boolean().default(false),
});
export const categorySchema = joi.object({
	name: joi.string().required(),
	type: joi.string().required(),
	thumbnail: joi.object().required(),
	description: joi.string().required(),
	deleted: joi.boolean().default(false),
	deletedAt: joi.date().default(null),
	createdAt: joi.string().default(() => new Date()),
	updatedAt: joi.string().default(() => new Date()),
	sub_categories: joi.array().default([]),
})