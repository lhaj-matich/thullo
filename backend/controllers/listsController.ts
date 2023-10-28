import { List, PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import { listUpdateValidator, listValidator } from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

import * as UtilsCtrl from "./factoryController";

const prisma = new PrismaClient();

export const createList = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 
  const { error, value } = listValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const list = await prisma.list.create({
    data: {
      name: value.name,
      Board: {
        connect: { id: value.boardId },
      },
    },
  });
  res.status(201).json({
    status: "success",
    list,
  });
});

export const getAllLists = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //! Need to configure this controller for nested routes.
  const lists = await prisma.list.findMany({
    where: {
      boardId: req.params.boardId ?? undefined,
    },
  });
  res.status(200).json({
    status: "success",
    lists,
  });
});

export const getListById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const list = await prisma.list.findUnique({
    where: {
      id,
    },
    include: {
      card: true,
    },
  });
  res.status(200).json({
    status: "success",
    list,
  });
});

export const updateListById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = listUpdateValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const list = (await UtilsCtrl.checkExistance(req, next, "list")) as List;
  const newList = await prisma.list.update({
    where: {
      id: list.id,
    },
    data: {
      ...value,
    },
  });
  if (!newList) return next(new AppError(`Could not update list ${list.id}`, 400));
  res.status(200).json({
    status: "success",
    newList,
  });
});

export const deleteListById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const list = (await UtilsCtrl.checkExistance(req, next, "list")) as List;
  await prisma.list.delete({
    where: {
      id: list.id,
    },
  });
  await UtilsCtrl.deleteNullComments();
  await UtilsCtrl.deleteNullCards();
  res.status(204).json({
    status: "success",
    list,
  });
});
