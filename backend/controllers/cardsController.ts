import { Card } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { cardUpdateValidator, cardValidator } from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import prisma from '../utils/Prisma';

import * as UtilsCtrl from "./factoryController";

export const createCard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = cardValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const count = await prisma.card.count({
    where: {
      listId: value.listId,
    },
  });
  const card = await prisma.card.create({
    data: {
      title: value.title,
      order: count + 1,
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

export const orderCards = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Source list: reorder the cards after the draggable card
  // Destination list: reorder the cards using the index
  // Body content: src, dest, srcIndex, destIndex
  const { src, dest, srcIndex, destIndex, cardId } = req.body;
  const sourceCards = await prisma.card.findMany({
    where: {
      listId: src,
      order: {
        gt: srcIndex + 1,
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  sourceCards.forEach(async (card) => {
    console.log("Updating card source")
    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        order: card.order - 1,
      },
    });
  });

  
  const destCards = await prisma.card.findMany({
    where: {
      listId: dest,
      order: {
        gte: destIndex + 1
      }
    },
    orderBy: {
      order: "asc"
    }
  });

  destCards.forEach(async (card) => {
    await prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        order: card.order + 1,
      },
    });
  })

  await prisma.card.update({
    where: {
      id: cardId
    },
    data: {
      listId: dest,
      order: destIndex + 1
    }
  })

  res.status(200).json({
    status: "success",
    message: "cards reordered successfully"
  })
});

export const getAllCards = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const cards = await prisma.card.findMany({
    where: {
      listId: req.params.listId ?? undefined,
    },
    orderBy: {
      order: "asc",
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
