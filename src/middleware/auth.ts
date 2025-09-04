import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";



const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "secret123") as JwtPayload;
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
