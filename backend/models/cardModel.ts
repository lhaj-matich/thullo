import Joi from "joi";

const uuidExpr: RegExp = new RegExp(/^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/);

export const cardSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  listId: Joi.string().regex(uuidExpr).required(),
});

export const cardUpdateSchema = Joi.object({
  title: Joi.string().min(5).max(100).optional(),
  description: Joi.string().optional(),
  coverImage: Joi.string().optional(),
})

export default cardSchema;
