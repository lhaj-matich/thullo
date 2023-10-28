import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

const prisma: any = new PrismaClient();

export const checkExistance = async (req: Request, next: NextFunction, model: string): Promise<any> => {
  const id = req.params.id;
  const item = await prisma[model].findFirst({
    where: {
      id,
    },
  });

  if (!item) return next(new AppError(`Could not find ${model}: ${id}`, 404));
  return item;
};

// Delete all the lists associated with that board
export const deleteNullLists = async () => await prisma.list.deleteMany({ where: { boardId: null } });
// Delete all the cards associated with those lists
export const deleteNullCards = async () => await prisma.card.deleteMany({ where: { listId: null } });
// Delete all the comments associated with those cards
export const deleteNullComments = async () => await prisma.comment.deleteMany({ where: { cardId: null } });
// Delete all the attachements associated with those cards
export const deleteNullAttachements = async () => await prisma.attachment.deleteMany({ where: { cardId: null } });
// Delete all the labels associated with those cards
export const deleteNullLabels = async () => await prisma.label.deleteMany({ where: { cardId: null } });
// Delete all the checklist which there id is null
export const deleteNullChecklists = async () => await prisma.checkList.deleteMany({ where: { cardId: null } });

//! These functions uses the any type because the validation function
//! Will take care of validating the types
const createBody = (fields: string[], values: any, connection: string[] | null) => {
  const obj: any = {};
  const connect: any = {};

  fields.forEach((key) => {
    obj[key] = values[key];
  });

  if (connection) {
    connection.forEach((key) => {
      connect[key] = values[key];
    });
    obj["connect"] = connect;
  }
  return obj;
};

export const createOne = (validatorFn: any, fields: string[], model: string, connection: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = validatorFn(req.body);
    if (error) return next(new AppError(error.message, 400));
    const item = await prisma[model].create({
      data: createBody(fields, value, connection),
    });
    res.status(201).json({
      status: "success",
      model: item,
    });
  });
};

const createIncludeObj = (fields: string[] | null) => {
  const obj: any = {};
  if (!fields) return obj;
  fields.forEach((key) => {
    obj[key] = true;
  });
  return obj;
};

export const getOneById = (model: string, selected: string[] | null) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    let item;
    if (selected) {
      item = await prisma[model].findUnique({
        where: {
          id,
        },
        include: createIncludeObj(selected),
      });
    } else {
      item = await prisma[model].findUnique({
        where: {
          id,
        },
      });
    }
    if (!item) return next(new AppError(`Could not find ${model}: ${id}`, 400));
    res.status(200).json({
      status: "success",
      model: item,
    });
  });
};
