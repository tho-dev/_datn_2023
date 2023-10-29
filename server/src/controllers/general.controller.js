import General from "../models/general.model"
import Category from "../models/category.model"
import Brand from "../models/brand.model"
import { Product } from '../models/product.model'
import { generalSchema } from "../validations/general"
import moment from "moment/moment"
import createError from "http-errors"

export async function getGeneral(req, res, next) {
	try {
		const general = await General.find({})

		return res.json({
			status: 200,
			message: 'Thành công',
			data: general[0] || {}
		})
	} catch (error) {
		next(error)
	}
}

export async function createGeneral(req, res, next) {
	try {
		const payload = req.body;
		const { error } = generalSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const doc = await General.create(payload)

		return res.json({
			status: 201,
			message: 'Thành công',
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function updateGeneral(req, res, next) {
	try {
		const payload = req.body;
		const { error } = generalSchema.validate(payload, { abortEarly: false });

		if (error) {
			const errors = error.details.map((items) => items.message);
			throw createError.BadRequest(errors)
		}

		const { _id, ...body } = payload

		const doc = await General.findOneAndUpdate({
			_id: _id
		}, {
			...body,
			updated_at: moment(new Date()).toISOString()
		}, {
			new: true
		})

		return res.json({
			status: 200,
			message: 'Thành công',
			data: doc
		})
	} catch (error) {
		next(error)
	}
}

export async function homeSettings(req, res, next) {
	try {
		const general = await General.find({}).select('-created_at -updated_at')
		const categories = await Category.find({}).select('-deleted -deteled_at -created_at -updated_at')


		const category = await Promise.all(categories?.map(async (item) => {
			const products = await Product.find({
				category_id: item?._id
			})

			const brands = await Brand.find({
				category_id: item?._id
			}).select('_id name slug shared_url')

			return {
				...item.toObject(),
				thumbnail: item?.thumbnail?.url,
				total: products?.length,
				brands: brands
			}
		}))

		const suggestion = categories?.map((item) => {
			return {
				name: item?.name,
				value: item?.shared_url
			}
		})

		return res.json({
			status: 200,
			message: "Thành công",
			data: {
				general: {
					...general[0].toObject() || {}
				},
				category: {
					title: 'Danh mục',
					items: category,
					type: 'slide'
				},
				suggestion: {
					title: "Gợi ý cho bạn",
					tags: suggestion,
				}
			}
		})
	} catch (error) {
		next(error)
	}
}