import { Comment } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { commentUpdateValidator, commentValidator } from "../utils/validator";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { checkExistance } from "./factoryController";
import prisma from '../utils/Prisma';


export const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = commentValidator(req.body);
  const cardId = req.params.cardId || value.cardId;
  if (!cardId) return next(new AppError("No card id was provided", 400));
  if (error) return next(new AppError(error.message, 400));
  const comment = await prisma.comment.create({
    data: {
      content: value.content,
      card: {
        connect: { id: cardId },
      },
      user: {
        connect: { id: req.currentUser },
      },
    },
    include: {
      user: {
        select: {
          fullname: true,
          profileImage: true
        }
      }
    }
  });
  if (!comment) next(new AppError("Could not create Comment", 400));
  res.status(201).json({
    status: "success",
    comment,
  });
});

export const getAllComments = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const comments = await prisma.comment.findMany({
    where: {
      card: {
        id: req.params.cardId ?? undefined,
      },
    },
    include: {
      user: {
        select: {
          fullname: true,
          profileImage: true,
        },
      },
    },
  });
  res.status(200).json({
    status: "success",
    comments,
    count: comments.length,
  });
});

export const updateCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = commentUpdateValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const comment = (await checkExistance(req, next, "comment")) as Comment;
  if (comment.userId != req.currentUser)
    return next(new AppError(`Only the author of this comment can perform this action`, 404));
  const newComment = await prisma.comment.update({
    where: {
      id: comment.id,
    },
    data: {
      content: value.content,
    },
  });
  res.status(200).json({
    status: "success",
    comment: newComment,
  });
});

export const deleteCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const comment = (await checkExistance(req, next, "comment")) as Comment;
  if (comment.userId != req.currentUser)
    return next(new AppError(`Only the author of this comment can perform this action`, 404));
  await prisma.comment.delete({
    where: {
      id: comment.id,
    },
  });
  res.status(200).json({
    status: "success",
    message: "Comment deleted succesfully."
  });
});
