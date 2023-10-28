import { Request } from "express";

export {}

declare global {
  namespace Express {
    export interface Request {
      currentUser: string,
      boardId: string | null
    }
  }
}
