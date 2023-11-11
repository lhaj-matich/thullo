import { Card, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { cardUpdateValidator, cardValidator } from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

import * as UtilsCtrl from "./factoryController";

const prisma = new PrismaClient();

export const createCard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = cardValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const card = await prisma.card.create({
    data: {
      title: value.title,
      author: {
        connect: { id: req.currentUser },
      },
      list: {
        connect: { id: value.listId },
      },
    },
    include: {
      author: {
        select: {
          fullname: true,
          email: true,
          profileImage: true,
          id: true,
        },
      },
    },
  });
  if (!card) next(new AppError("Could not create Card", 400));
  res.status(201).json({
    status: "success",
    card,
  });
});

export const getCardById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const card = await prisma.card.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          fullname: true,
          email: true,
          profileImage: true,
          id: true,
        },
      },
      comments: true,
      attachments: true,
      labels: true,
      checklists: true,
    },
  });
  res.status(200).json({
    status: "success",
    card,
  });
});

export const getAllCards = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const cards = await prisma.card.findMany({
    where: {
      listId: req.params.listId ?? undefined,
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: {
        select: {
          fullname: true,
          email: true,
          profileImage: true,
          id: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              fullname: true,
              profileImage: true,
            },
          },
        },
      },
      attachments: true,
      labels: true,
      checklists: true,
    },
  });
  res.status(200).json({
    status: "success",
    cards,
    count: cards.length,
  });
});

export const updateCardById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { error, value } = cardUpdateValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const card = (await UtilsCtrl.checkExistance(req, next, "card")) as Card;
  await prisma.card.update({
    where: {
      id,
    },
    data: {
      ...value,
    },
  });
  res.status(200).json({
    status: "success",
    card,
  });
});

export const deleteCardById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const card = (await UtilsCtrl.checkExistance(req, next, "card")) as Card;
  await prisma.card.delete({
    where: {
      id,
    },
  });

  await UtilsCtrl.deleteNullComments();
  await UtilsCtrl.deleteNullAttachements();
  await UtilsCtrl.deleteNullLabels();
  await UtilsCtrl.deleteNullChecklists();
  res.status(204).json({
    status: "success",
    card,
  });
});
