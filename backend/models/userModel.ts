import Joi from "joi";

const userSchema = Joi.object({
  fullname: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  profileImage: Joi.string().optional(),
});

export default userSchema;
