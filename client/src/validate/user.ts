import * as Joi from 'joi';

export const registerSchema = Joi.object({
  first_name: Joi.string().required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
  }),
  last_name: Joi.string().required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
  }),
  location: Joi.string().required().trim().messages({
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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  password: Joi.string().min(6).required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
    'string.min': 'Tối thiểu 6 ký tự',
  }),
  confirm_password: Joi.any().equal(Joi.ref('password')).required().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
    'any.only': 'Mật khẩu không khớp',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .messages({
      'string.email': 'Email không hợp lệ',
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
  password: Joi.string().min(6).required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
    'string.min': 'Tối thiểu 6 ký tự',
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
  otp_code: Joi.string().required().trim().messages({
    'string.empty': 'Không được để trống',
    'any.required': 'Trường này bắt buộc phải nhập',
  }),
});
