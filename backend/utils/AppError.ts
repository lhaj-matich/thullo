export default class AppError extends Error {
  statusCode: number;
  status: String;
  isOperational: Boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.toString().startsWith("4") ? "failure" : "internal server error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
