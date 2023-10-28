import Joi from "joi";

const uuidExpr: RegExp = new RegExp(/^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/);

const commentSchema = Joi.object({
  userId: Joi.string().regex(uuidExpr).required(),
});

export default commentSchema;
