import { Demand, DemandValue } from "../models/demand.model"
import createError from "http-errors"
import moment from "moment/moment"

export async function getAllDemand(req, res, next) {
	try {
		const demands = await Demand.find({})
		return res.json({
			status: 200,
			message: 'Thành công',
			data: demands
		})
	} catch (error) {
		next(error)
	}
}

export async function getOneDemand(req, res, next) {
	try {
		const slug = req.params.slug
		const demand = await Demand.findOne({ slug: slug })
		if (!demand) {
			throw createError.BadRequest("Demand của bạn không được tìm thấy")
		}
		return res.json({
			status: 200,
			message: 'Thành công',
			data: demand
		})

	} catch (error) {
		next(error)
	}
}

export async function createDemand(req, res, next) {
	try {
		const payload = req.body;
		const demand = await Demand.create(payload)
		return res.status(201).json({
			status: 201,
			message: 'Thành công',
			data: demand
		})
	} catch (error) {
		next(error)
	}
}


export async function updateDemand(req, res, next) {
	try {
		const id = req.params.id
		const payload = req.body
		const demand = await Demand.findOne({ _id: id })

		if (!demand) {
			throw createError.BadRequest("Demand của bạn không được tìm thấy")
		}

		const doc = await Demand.findOneAndUpdate({ _id: id }, { ...payload, updated_at: moment(new Date).toISOString() }, { new: true })
		return res.json({
			status: 200,
			message: 'Cập nhật thành công',
			data: doc,
		})

	} catch (error) {
		next(error)
	}
}

export async function removeDemand(req, res, next) {
	try {
		const id = req.params.id
		const demand = await Demand.findOne({ _id: id })

		if (!demand) {
			throw createError.BadRequest("Demand của bạn không được tìm thấy")
		}
		const doc = await Demand.delete({ _id: id })
		return res.json({
			status: 200,
			message: 'Xóa thành công',
			data: demand,
		})
	} catch (error) {

	}
}