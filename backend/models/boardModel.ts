import Joi from "joi";
import { Response} from "express";
import EncryptText from "../utils/Encyption";


export const boardSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  coverImage: Joi.string().optional(),
  description: Joi.string().optional(),
  visibility: Joi.boolean().optional(),
});

export const boardUpdateSchema = Joi.object({
  title: Joi.string().min(5).max(100).optional(),
  coverImage: Joi.string().optional(),
  description: Joi.string().optional(),
  visibility: Joi.boolean().optional(),
});

export const sendBoardId = async (boardId: string, res: Response) => {
  // Set the board id
  const encryptedBoardId = new EncryptText(boardId).encrypt();

  const cookieOptions: any = {
    httpOnly: process.env.DEV_MODE === "dev" ? true : false,
    secure: process.env.DEV_MODE === "dev" ? false : true,
    sameSite: process.env.DEV_MODE === "dev" ? 'lax' : 'none',
    expires: new Date(Date.now() + 2160 * 60 * 601000),
  };
  res.cookie("boardId", encryptedBoardId, cookieOptions);
};

