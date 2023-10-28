/// ^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$

import Joi from "joi";

const uuidExpr: RegExp = new RegExp(/^[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}$/);

export const listSchema = Joi.object({
  name: Joi.string().min(5).required(),
  boardId: Joi.string()
    .regex(uuidExpr)
    .required(),
});

export const listUpdateSchema = Joi.object({
  name: Joi.string().min(5).optional(),
})

