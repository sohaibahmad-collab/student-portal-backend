import ApiError from "@src/utils/apiError";
import { HttpMessage } from "@src/utils/httpMessage";
import { HttpStatusCode } from "@src/utils/httpStatus";
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

  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode:HttpStatusCode,
    message: err.message || HttpMessage.INTERNAL_SERVER_ERROR,
  });
};

export default errorMiddleware;