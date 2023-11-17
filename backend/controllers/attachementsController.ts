import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

import { attachementValidator } from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import multer from "multer";
import sharp from "sharp";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import prisma from '../utils/Prisma';
import firebaseConfig from "../utils/firebaseConfig";

initializeApp(firebaseConfig);

const multerStorage = multer.memoryStorage();

const storage = getStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedFiles = ["image/png", "image/jpeg", "application/pdf"];

  if (file.size > 100 * 1024)
    cb(new AppError("File is large than 100kb.", 400), false);
  if (allowedFiles.includes(file.mimetype)) cb(null, true);
  else cb(new AppError("Unsupported file type.", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 100 * 1024, // 100kb
  },
});

export const  uploadCardAttachement = upload.single("attachement");

export const FirebaseUploadAttachements = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const storageRef = ref(storage, `attachements/${req.currentUser + Date.now()}`);

  const metaData = {
    contentType: req.file?.mimetype,
  };

  if (!req.file?.buffer) return next(new AppError("File Error: invalid file buffer", 400));

  const snapShot = await uploadBytesResumable(storageRef, req.file?.buffer, metaData);
  const publicURL = await getDownloadURL(snapShot.ref);
  req.file.filename = publicURL;
  next();
});

export const processAttachement = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  if (req.file.mimetype.startsWith("image")) {
    req.file.filename = "attachement-" + req.currentUser + "-" + Date.now() + ".jpeg";
    sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/attachement/${req.file.filename}`);
  } else {
    if (req.file.mimetype === "application/pdf") {
      req.file.filename = "attachement-" + req.currentUser + "-" + Date.now() + ".pdf";
      const destinationPath = path.join("public/attachement/", req.file.filename);

      fs.writeFile(destinationPath, req.file.buffer, (err) => {
        if (err) {
          console.error("Error saving the PDF file:", err);
          return next(err);
        }
      });
    } else {
      next(new AppError("Unsupported file type.", 400));
    }
  }
  next();
};

export const createAttachement = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = attachementValidator(req.body);
  const cardId = req.params.cardId || value.cardId;
  if (!cardId) return next(new AppError("No card id was provided", 400));
  if (error) return next(new AppError(error.message, 400));
  const attachement = await prisma.attachment.create({
    data: {
      title: value.title,
      path: req.file?.filename as string,
      card: {
        connect: { id: cardId },
      },
    },
  });
  if (!attachement) next(new AppError("Could not create attachement", 400));
  res.status(201).json({
    status: "success",
    attachement,
  });
});

export const getAttachementById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const attachement = await prisma.attachment.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json({
    status: "success",
    board: attachement,
  });
});

export const getAllAttachements = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const attachements = await prisma.attachment.findMany({
    where: {
      card: {
        id: req.params.cardId ?? undefined,
      },
    },
  });
  res.status(200).json({
    status: "success",
    attachements,
    count: attachements.length,
  });
});

export const deleteAttachementById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //? Gonna need the current board id
  //! @validation: This should be deleted only if the user is a memeber or author of the memeber which the cards belong to
  const id = req.params.id;
  const attachement = await prisma.attachment.delete({
    where: {
      id,
    },
  });
  res.status(204).json({
    status: "success",
    attachement,
  });
});
