import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { labelValidator } from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";

const prisma = new PrismaClient();

export const createLabel = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = labelValidator(req.body);
  const cardId = req.params.cardId || value.cardId;
  if (!cardId) return next(new AppError("No card id was provided", 400));
  if (error) return next(new AppError(error.message, 400));
  const label = await prisma.label.create({
    data: {
      color: value.color,
      tag: value.tag,
      card: {
        connect: { id: cardId },
      },
    },
  });
  if (!label) next(new AppError("Could not create Label", 400));
  res.status(201).json({
    status: "success",
    label,
  });
});

export const getAllLabels = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const labels = await prisma.label.findMany({
    where: {
      card: {
        id: req.params.cardId ?? undefined,
      },
    },
  });
  res.status(200).json({
    status: "success",
    labels,
    count: labels.length,
  });
});

export const deleteLabelById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const label = await prisma.label.delete({
      where: {
        id,
      },
    });
    res.status(204).json({
      status: "success",
      label,
    });
  }
);
