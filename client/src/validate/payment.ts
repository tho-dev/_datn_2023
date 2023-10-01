import * as Joi from "joi";
export const shipSchema = Joi.object({
	name: Joi.string().trim().required().messages({
		"string.empty": "Không được bỏ trống",
		"any.required": "Trường này bắt buộc phải nhập",
	}),
	phone: Joi.string()
		.regex(/^[0-9]{10}$/)
		.required()
		.trim()
		.messages({
			"string.pattern.base": `Số điện thoại không hợp lệ`,
			"string.empty": "Không được để trống",
			"any.required": "Trường này bắt buộc phải nhập",
		}),
	address: Joi.string().trim().required().messages({
		"string.empty": "Không được bỏ trống",
		"any.required": "Trường này bắt buộc phải nhập",
	}),
	district: Joi.string().trim().required().messages({
		"string.empty": "Không được bỏ trống",
		"any.required": "Trường này bắt buộc phải nhập",
	}),
	storeAddress: Joi.string().required().messages({}),
	note: Joi.string().optional().allow("").trim().messages({}),
	payment: Joi.string().required().messages({}),
});
export const atStoreSchema = Joi.object({
	name: Joi.string().trim().required().messages({
		"string.empty": "Không được bỏ trống",
		"any.required": "Trường này bắt buộc phải nhập",
	}),
	phone: Joi.string()
		.regex(/^[0-9]{10}$/)
		.required()
		.trim()
		.messages({
			"string.pattern.base": `Số điện thoại không hợp lệ`,
			"string.empty": "Không được để trống",
			"any.required": "Trường này bắt buộc phải nhập",
		}),
	address: Joi.string().optional().allow("").trim().messages({}),
	district: Joi.string().optional().allow("").trim().messages({}),
	note: Joi.string().optional().allow("").trim().messages({}),
	payment: Joi.string().optional().allow("").trim().messages({}),
	storeAddress: Joi.string().optional().allow("").trim().messages({}),
});
export const otpSchema = Joi.object({
	otp: Joi.string().required().messages({
		"string.empty": "Không được bỏ trống",
		"any.required": "Trường này bắt buộc phải nhập",
	}),
});
