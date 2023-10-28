import { ObjectSchema } from "joi";

import userSchema from "../models/userModel";
import labelSchema from "../models/labelModel";
import inviteSchema from "../models/inviteModel";
import attachementSchema from "../models/attachementModel";
import { listSchema, listUpdateSchema } from "../models/listModel";
import { cardSchema, cardUpdateSchema } from "../models/cardModel";
import { taskSchema, taskUpdateSchema } from "../models/checklistModel";
import { boardUpdateSchema, boardSchema } from "../models/boardModel";
import { commentUpdateSchema, commentSchema } from "../models/commentModel";

const validator = (schema: ObjectSchema) => (payload: object) =>
  schema.validate(payload, { abortEarly: true });

export const userValidator = validator(userSchema);
export const listValidator = validator(listSchema);
export const listUpdateValidator = validator(listUpdateSchema);
export const boardValidator = validator(boardSchema);
export const boardUpdateValidator = validator(boardUpdateSchema);
export const attachementValidator = validator(attachementSchema);
export const commentValidator = validator(commentSchema);
export const commentUpdateValidator = validator(commentUpdateSchema);
export const labelValidator = validator(labelSchema);
export const cardValidator = validator(cardSchema);
export const cardUpdateValidator = validator(cardUpdateSchema);
export const inviteValidator = validator(inviteSchema);
export const taskValidator = validator(taskSchema);
export const taskUpdateValidator = validator(taskUpdateSchema);
