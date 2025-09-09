import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@src/models/User";
import { settings } from "@src/config/settings";
import { HttpStatusCode } from "@src/utils/httpStatus";
import { HttpMessage } from "@src/utils/httpMessage";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email,name, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email,name, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("Server error");
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(HttpStatusCode.BAD_REQUEST).json({ msg: "Invalid password" });

    const token = jwt.sign({ userId: user._id },settings.JWT_SECRET as string, { expiresIn: "1h" });
    res.json({token });
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(HttpMessage.INTERNAL_SERVER_ERROR);
  }
};
