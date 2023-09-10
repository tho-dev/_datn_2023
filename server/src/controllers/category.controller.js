import Category from "../models/category.model"


export async function getAllCategory(req, res, next) {
	try {
		const categories = await Category.find({})

		return res.json({
			status: 200,
			message: 'Thành công',
			data: categories
		})
	} catch (error) {
		next(error)
	}
}