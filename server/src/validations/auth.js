import joi from "joi";

export const loginShema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().min(3),
});
