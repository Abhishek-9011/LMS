import { User } from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "fill all the details",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "user with this email already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({
      success: true,
      message: "user registerd successfully",
    });
  } catch (e) {
    res.json({
      success: false,
      message: "some error occured" + e,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      res.json({
        success:false,
        message: "fill all details correctly"
      })
    }
    const user = await User.findOne({email});
    if(!user){
      res.json({
        success: false,
        message: "incorrect email or password"
      })
    }
    const isPasswordMatch = bcrypt.compare(password, user?.password as string);
    if(!isPasswordMatch){
      res.json({
        success: false,
        message: "incorrect email or password"
      })
    }
    generateToken(res, user, `Welcome back ${user?.name}`)
  } catch (error) {}
};
