import multer from "multer";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import sharp from "sharp";

const prisma = new PrismaClient();

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("Invalid file please upload a valid picture", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("profileImage");

export const processUserPhoto = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  req.file.filename = "user-" + req.currentUser + "-" + Date.now() + ".jpeg";
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const search = req.query.search as string;
  if (!req.boardId) return next(new AppError(`Board id is needed to filter out users`, 400));
  const board = await prisma.board.findUnique({
    where: {
      id: req.boardId,
    },
    select: {
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
  //! Maybe i will remove the users in the invites too only display the users who did not receive the invite.
  const boardInvites = await prisma.invite.findMany({
    where: {
      ownerId: req.currentUser,
      boardId: req.boardId
    }
  })
  const boardInviteUsers = boardInvites.map((invite) => invite.userId);
  const boardUsers = board?.users.map((user) => user.id) || [];
  const combinedUsers = [...boardUsers, ...boardInviteUsers ,board?.author.id];
  const users = await prisma.user.findMany({
    select: { id: true, fullname: true, email: true, profileImage: true },
    where: {
      fullname: {
        contains: search ?? undefined,
        mode: "insensitive",
      },
    },
    take: 10
  });
  let result = users.filter((item) => !combinedUsers.includes(item.id));
  if (!search)
    result = result.slice(0, 10);
  res.status(200).json({
    status: "success",
    users: result,
    count: result.length,
  });
});

export const getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    select: { id: true, fullname: true, email: true, profileImage: true },
    where: {
      id,
    },
  });
  if (!user) return next(new AppError(`User ${req.params.id} does not exists`, 400));
  res.status(200).json({
    status: "success",
    user,
  });
});

export const updateCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //! Should use check existing function here to validate the existance of the user and only apply this action
  const id = req.currentUser;
  const { fullname, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id,
    },
    select: { id: true, fullname: true, email: true, profileImage: true },
    data: {
      fullname,
      email,
      profileImage: req.file?.filename ?? undefined,
    },
  });
  res.status(200).json({
    status: "success",
    user,
  });
});

export const deleteCurrentUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.currentUser;

  const myBoards = await prisma.board.findMany({
    where: { author: { id } },
  });
  const contriBoards = await prisma.board.findMany({
    where: { users: { some: { id } } },
  });
  const userComments = await prisma.comment.findMany({
    where: { user: { id } },
  });

  const disconnectUser = contriBoards.map((board) =>
    prisma.board.update({
      where: { id: board.id },
      data: { users: { disconnect: { id } } },
    })
  );
  const deleteAuthor = myBoards.map((board) =>
    prisma.board.delete({
      where: { id: board.id },
    })
  );
  const deleteComments = userComments.map((comment) =>
    prisma.comment.delete({
      where: {
        id: comment.id,
      },
    })
  );

  await Promise.all(disconnectUser);
  await Promise.all(deleteAuthor);
  await Promise.all(deleteComments);
  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "success",
    message: "user deleted succesfully.",
  });
});
