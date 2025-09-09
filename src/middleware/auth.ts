import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "@src/utils/apiError";
import { settings } from "@src/config/settings";
import { HttpStatusCode } from "@src/utils/httpStatus";



const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token,settings.JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(HttpStatusCode.NOT_FOUND).json({ msg: "Token is not valid" });
  }
};

export default auth;
