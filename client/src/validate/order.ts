import * as Joi from 'joi';

export const checkPhoneSchema = Joi.object({
  phone_number: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .trim()
    .messages({
      'string.pattern.base': `Số điện thoại không hợp lệ`,
      'string.empty': 'Không được để trống',
      'any.required': 'Trường này bắt buộc phải nhập',
    }),
});
