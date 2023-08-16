

export async function getAllProduct(req, res, next) {
	try {
		return res.json({
			status: 200,
			message: 'Thành công',
			data: []
		})
	} catch (error) {
		next(error)
	}
}