import { NextFunction, Request, Response } from "express";

import { inviteValidator } from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import prisma from '../utils/Prisma';


export const createInvite = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //! Validate the duplication of invite
  if (!req.boardId) return next(new AppError(`Board id is missing, please select a board first.`, 400));
  const { error, value } = inviteValidator(req.body);
  if (error) return next(new AppError(error.message, 400));
  const checkDuplicate = await prisma.invite.findFirst({
    where: {
      userId: value.userId,
      boardId: req.boardId,
    },
  });
  if (checkDuplicate)
    return res.status(200).json({
      status: "success",
      message: "Pending invite.",
    });
  //! Should find a way to refactor this function getting all users related to a board by id.
  const board = await prisma.board.findUnique({
    where: {
      id: req.boardId,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
      author: {
        select: {
          id: true,
        },
      },
    },
  });
  const boardUsers = board?.users.map((user) => user.id) || [];
  const result = [...boardUsers, board?.author.id];
  if (!result.includes(req.currentUser))
    return next(new AppError(`You are not authorized to send invites from board: ${req.boardId}.`, 400));
  const invite = await prisma.invite.create({
    data: {
      ownerId: req.currentUser,
      user: {
        connect: { id: value.userId },
      },
      board: {
        connect: { id: req.boardId },
      },
    },
  });
  if (!invite) next(new AppError("Could not create invite", 400));
  res.status(201).json({
    status: "success",
    invite,
  });
});

export const acceptInvite = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Get the invite informations
  //! I can refactor this code and use the checkExisting function
  const inviteId = req.body.id;
  if (!inviteId) return next(new AppError("Please provide an invite id", 404));
  const invite = await prisma.invite.findUnique({
    where: {
      id: inviteId,
    },
  });
  if (!invite) return next(new AppError("Please provide an invite id", 404));
  if (invite.userId !== req.currentUser)
    return next(new AppError("You are not authorized to accept this invite", 401));
  // If the invite is valid link the user to the board
  await prisma.board.update({
    where: {
      id: invite.boardId,
    },
    data: {
      users: {
        connect: { id: invite.userId },
      },
    },
  });
  // After accepting the invite delete it
  await prisma.invite.delete({
    where: {
      id: inviteId,
    },
  });
  res.status(200).json({
    status: "success",
    message: "Invite accepted.",
  });
});

export const getInviteById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.body.id;
  const invite = await prisma.invite.findUnique({
    where: {
      id,
    },
  });
  if (!invite) return next(new AppError(`Could not find the invite ${id}`, 404));
  res.status(200).json({
    status: "success",
    invite,
  });
});

export const getSentInvites = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invites = await prisma.invite.findMany({
    where: {
      ownerId: req.currentUser,
    },
    include: {
      board: true,
      user: {
        select: { id: true, fullname: true, email: true, profileImage: true },
      },
    },
  });
  res.status(200).json({
    status: "success",
    invites,
    count: invites.length,
  });
});

//? Get all the invites related to a user
export const getAllInvites = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const invites = await prisma.invite.findMany({
    where: {
      userId: req.currentUser,
    },
    include: {
      board: {
        include: {
          users: {
            select: {
              fullname: true,
              profileImage: true,
              email: true,
            },
          },
          author: {
            select: {
              fullname: true,
              profileImage: true,
              email: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json({
    status: "success",
    invites,
    count: invites.length,
  });
});

export const deleteInviteById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const invite = await prisma.invite.findUnique({
    where: {
      id
    }
  })
  if (!invite) return next(new AppError("Could not find invite.", 401));
  await prisma.invite.delete({
    where: {
      id,
    },
  });
  res.status(200).json({
    status: "success",
    message: "Invite deleted.",
  });
});
