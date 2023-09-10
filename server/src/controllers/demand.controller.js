import { Demand, DemandValue } from "../models/demand.model"

export async function getAllDemand(req, res, next) {
	try {
		const demands = await Demand.find({

		})


		return res.json({
			status: 200,
			message: 'Thành công',
			data: demands
		})
	} catch (error) {
		next(error)
	}
}