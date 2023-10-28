import General from "../models/general.model"
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

		const { _id, body } = payload

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