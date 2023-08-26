import { Product, Option, OptionValue, Sku, Variant } from '../models/product.model'
import createError from "http-errors"


// lấy tất cả sản phẩm
export async function getAllProduct(req, res, next) {
	try {
		const not = '-assets._id -attributes._id -attributes.items._id'
		const data = await Product.find({}).select(not)

		return res.json({
			status: 200,
			message: 'Thành công',
			data
		})
	} catch (error) {
		next(error)
	}
}

export async function getSingleProduct(req, res, next) {
	try {
		const not = '-assets._id -attributes._id -attributes.items._id'
		const { slug } = req?.params

		const product = await Product.findOne({
			slug
		}).select(not)

		if (!product) {
			throw createError.BadRequest('Sản phẩm không tồn tại')
		}

		const option = await Option.findOne({
			product_id: product?._id.toString()
		})

		console.log('product?._id.toString()', product?._id.toString())


		return res.json({
			status: 200,
			message: 'Thành công',
			data: option
		})
	} catch (error) {
		next(error)
	}
}