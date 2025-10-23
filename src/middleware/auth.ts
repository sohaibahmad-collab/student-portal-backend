import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "@src/utils/apiError";
import { settings } from "@src/config/settings";
import { HttpStatusCode } from "@src/utils/httpStatus";
import { HttpMessage } from "@src/utils/httpMessage";



const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
   
      return new ApiError(HttpStatusCode.UNAUTHORIZED,HttpMessage.NO_TOKEN)
    
  }

  try {
    const decoded = jwt.verify(token,settings.JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    return new ApiError(HttpStatusCode.NOT_FOUND,HttpMessage.INVALID_TOKEN)
  }
};

export default auth;
