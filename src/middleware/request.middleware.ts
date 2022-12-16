import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ERROR_INTERNAL } from "../contants/contants";
import { FormResponse } from "../type/index";
import { userType } from "../type/user.type";

export const requestMiddleWare = async (
  req: Request<{}, {}, {}, userType>,
  res: Response<FormResponse<any>>,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Invalid Token" });
  try {
    const data: any = jwt.verify(token, process.env.TOKEN_KEY as string);
    req.username = data.username;
    req.user_id = data.user_id;
    next();
  } catch (error) {
    console.log("error:::", error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token hết hạn", status: 401 });
    }
    return ERROR_INTERNAL(res);
  }
};
