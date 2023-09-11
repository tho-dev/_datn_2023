import Brand from "../models/brand.model"

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