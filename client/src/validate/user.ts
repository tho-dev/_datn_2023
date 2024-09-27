import * as Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
  }),
  address: Joi.string().required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .trim()
    .messages({
      'string.pattern.base': `Số điện thoại không hợp lệ`,
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  note: Joi.string()
    .required()
    .trim()
    .messages({
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  cccd: Joi.string()
    .required()
    .trim()
    .messages({
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
});

export const loginSchema = Joi.object({
  userName: Joi.string()
    .required()
    .trim()
    .messages({
      'string.userName': 'Tài khoản không hợp lệ',
      'string.empty': 'Không được để trống tài khoản',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  password: Joi.string().min(6).required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
    'string.min': 'Tối thiểu 6 ký tự',
  }),
});
export const ResetPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  new_password: Joi.string().min(6).required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
    'string.min': 'Tối thiểu 6 ký tự',
  }),
  otp_code: Joi.string().min(6).required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
  }),
});
export const sendOtpPasswordSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
});
