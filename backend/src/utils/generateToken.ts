import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, user: any, message: any) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "2d",
    }
  );

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 48 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
    });
};
