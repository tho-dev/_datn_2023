import Brand from "../models/brand.model"
import createError from "http-errors"
import moment from "moment/moment"

export async function getAllBrand(req, res, next) {
	try {
		const brands = await Brand.find({})

		return res.json({
			status: 200,
			message: 'Thành công',
			data: brands
		})
	} catch (error) {
		next(error)
	}
}

export async function getOneBrand(req, res, next) {
	try {
		const slug = req.params.slug
		const brand = await Brand.findOne({ slug: slug })
		if (!brand) {
			throw createError.BadRequest("Brand của bạn không được tìm thấy")
		}
		return res.json({
			status: 200,
			message: 'Thành công',
			data: brand
		})

	} catch (error) {
		next(error)
	}
}

export async function createBrand(req, res, next) {
	try {
		const payload = req.body;
		const brand = await Brand.create(payload)
		return res.status(201).json({
			status: 201,
			message: 'Thành công',
			data: brand
		})
	} catch (error) {
		next(error)
	}
}

export async function updateBrand(req, res, next) {
	try {
		const id = req.params.id
		const payload = req.body
		const brand = await Brand.findOne({ _id: id })

		if (!brand) {
			throw createError.BadRequest("Brand của bạn không được tìm thấy")
		}

		const doc = await Brand.findOneAndUpdate({ _id: id }, { ...payload, updated_at: moment(new Date).toISOString() }, { new: true })
		return res.json({
			status: 200, 
			message: 'Cập nhật thành công',
			data: doc,
		})

	} catch (error) {
		next(error)
	}
}

export async function removeBrand(req, res, next) {
	try {
		const id = req.params.id
		const brand = await Brand.findOne({ _id: id })

		if (!brand) {
			throw createError.BadRequest("Brand của bạn không được tìm thấy")
		}
		const doc = await Brand.delete({ _id: id })
		return res.json({
			status: 200,
			message: 'Xóa thành công',
			data: brand,
		})
	} catch (error) {

	}
}