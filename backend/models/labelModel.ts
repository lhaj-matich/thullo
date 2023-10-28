import Joi from "joi";

const uuidExpr: RegExp = new RegExp(/^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/);

const labelSchema = Joi.object({
  color: Joi.string().min(3),
  tag: Joi.string().min(3).max(20),
  cardId: Joi.string().regex(uuidExpr).optional(),
});

export default labelSchema;
