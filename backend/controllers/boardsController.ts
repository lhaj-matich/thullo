import { Board, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import * as UtilsCtrl from "./factoryController";

import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { boardUpdateValidator, boardValidator } from "../utils/validator";
import { sendBoardId } from "../models/boardModel";
import { checkExistance } from "./factoryController";

const prisma = new PrismaClient();

prisma.$use(async (param, next) => {
  const startTime = Date.now();
  const result = await next(param);
  console.log('Query Took: ', Date.now() - startTime, ' ms');
  return result;
})

export const createBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = boardValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const board = await prisma.board.create({
    data: {
      title: value.title,
      coverImage: value.coverImage,
      visibility: value.visibility,
      author: {
        connect: { id: req.currentUser },
      },
    },
    include: {
      author: {
        select: {
          id: true,
          fullname: true,
          email: true,
          profileImage: true,
        },
      },
      users: {
        select: {
          id: true,
          fullname: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });
  if (!board) next(new AppError("Could not create board", 400));
  res.status(201).json({
    status: "success",
    board,
  });
});

export const getMyboards = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const boards = await prisma.board.findMany({
    where: {
      OR: [
        {
          authorId: req.currentUser,
        },
        {
          users: { some: { id: req.currentUser } },
        },
      ],
    },
    include: {
      author: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
      users: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
    },
  });
  console.log('Find unique took: ', Date.now() - startTime + ' ms');
  res.status(200).json({
    status: "success",
    boards,
    count: boards.length,
  });
});

export const getBoardById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const board = await prisma.board.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
      users: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
      lists: true,
    },
  });
  if (!board) return next(new AppError(`Could not find board: ${id}`, 404));
  const boardUsers = board.users.map((user) => user.id);
  if (board.author.id !== req.currentUser && !boardUsers.includes(req.currentUser))
  {
    if (!board.visibility)
      return next(new AppError(`You don't have permissions to access board: ${id}`, 401));
    await prisma.board.update({
      where: {
        id: board.id
      },
      data: {
        users: {
          connect: {
            id: req.currentUser
          }
        }
      }
    })
  }
  sendBoardId(board.id, res);
  res.status(200).json({
    status: "success",
    board,
  });
});

export const getAllBoards = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const privateBoards = await prisma.board.findMany({
    where: {
      OR: [
        {
          authorId: req.currentUser,
        },
        {
          users: { some: { id: req.currentUser } },
        },
      ],
      AND: {
        visibility: false
      }
    },
    include: {
      author: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
      users: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
    },
  });

  const publicBoards = await prisma.board.findMany({
    where: {
      visibility: true
    },
    include: {
      author: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
      users: {
        select: { id: true, fullname: true },
      },
    },
  })
  
  const boards = [...privateBoards, ...publicBoards];

  res.status(200).json({
    status: "success",
    boards,
    count: boards.length,
  });
});

export const removeUserFromBoard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  if (!req.boardId) return next(new AppError(`You need to select a board first.`, 400));
  const board = await prisma.board.findFirst({
    where: {
      id: req.boardId,
    },
    include: {
      author: true,
      users: true,
    },
  });
  if (board?.author.id != req.currentUser)
    return next(new AppError(`Only admins can perform this action`, 401));
  const users = board.users.map((user) => user.id);
  if (!users.includes(id)) return next(new AppError(`The user: ${id} is not a member of this board.`, 400));
  await prisma.board.update({
    where: {
      id: req.boardId,
    },
    data: {
      users: {
        disconnect: { id },
      },
    },
  });
  res.status(200).json({
    status: "success",
    message: "User removed succesfully.",
  });
});

export const updateBoardById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = boardUpdateValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const newBoard = await prisma.board.update({
    where: {
      id: req.boardId || req.params.id,
    },
    data: {
      ...value,
    },
  });
  res.status(200).json({
    status: "success",
    newBoard,
  });
});

export const deleteBoardById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const board = (await checkExistance(req, next, "board")) as Board;

  await prisma.board.delete({
    where: {
      id: board.id,
    },
  });

  await UtilsCtrl.deleteNullLists();
  await UtilsCtrl.deleteNullCards();
  await UtilsCtrl.deleteNullComments();

  res.status(204).json({
    status: "success",
    board,
  });
});
