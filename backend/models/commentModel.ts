import Joi from "joi";

const uuidExpr: RegExp = new RegExp(/^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/);

export const commentSchema = Joi.object({
  content: Joi.string().min(5).max(500).required(),
  cardId: Joi.string().regex(uuidExpr).required(),
  userId: Joi.string().regex(uuidExpr).optional(),
});

export const commentUpdateSchema = Joi.object({
  content: Joi.string().min(5).max(500).optional(),
});

export default commentSchema;
