import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@src/models/User";
import { settings } from "@src/config/settings";
import { HttpStatusCode } from "@src/utils/httpStatus";
import { HttpMessage } from "@src/utils/httpMessage";
import ApiError from "@src/utils/apiError";


export const registerUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { email,name, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(HttpStatusCode.BAD_REQUEST).json({ msg:HttpMessage.BAD_REQUEST});

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email,name, password: hashedPassword });
    await user.save();

    res.json({ msg: HttpMessage.CREATED});
  } catch (err) {
    next(err)
  }
};


export const loginUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)return next(
        new ApiError(HttpStatusCode.BAD_REQUEST, HttpMessage.INVALID_EMAIL)
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(
        new ApiError(HttpStatusCode.BAD_REQUEST,HttpMessage.INVALID_PASSWORD)
      );

    const token = jwt.sign({ userId: user._id },settings.JWT_SECRET as string, { expiresIn: "1h" });
    res.json({token });
  } catch (err) {
    next(err)
  }
};
