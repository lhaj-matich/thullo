import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from 'jsonwebtoken'
import { Prisma } from "@prisma/client";

import AppError from "../utils/AppError";


const handleOperationErrors = (err: Error): any => {
  // Handle database errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const keys = err.meta?.target as string[];
      return new AppError(`Duplicated keys : ${keys.join(",")} have to be unique`, 400);
    } else if (err.code === "P1001") return new AppError(`Connection Error : Cloud not reach database server`, 400);
    else if (err.code === "P1008") return new AppError(`Timeout Error : Operations timed out `, 400);
    else if (err.code === "P1008") return new AppError(`Timeout Error : Operations timed out `, 400);
  }
  else if (err instanceof JsonWebTokenError)
  {
    // Handle authentification and errors related to JWT
    if (err.name === "JsonWebTokenError")
      return new AppError("the user is not logged in anymore or jwt is in bad format", 400);
  }
  //? This should stay here for the logs
  console.log(err);
  // Handle generic errors
  return new AppError("Internal API Error. Contact adminstrator", 500);
};

const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof AppError)) err = handleOperationErrors(err);
  if (err instanceof AppError) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "failure";
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

export default handleErrors;
