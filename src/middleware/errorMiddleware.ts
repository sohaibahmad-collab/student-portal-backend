import ApiError from "@src/utils/apiError";
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    statusCode: 500,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;