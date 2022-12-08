import { Request, Response, NextFunction } from "express";
import { FormResponse } from "../type";
import { userType } from "../type/user.type";

export const validateLogin = (
  req: Request<{}, {}, Pick<userType, "username" | "password">>,
  res: Response<FormResponse<any>>,
  next: NextFunction
) => {
  const { password, username } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu tài khoản hoặc mật khẩu" });
  }
  if (username.length < 4)
    return res.status(400).json({ message: "Tài khoản tối thiểu 4 ký tự" });
  if (username.length > 12)
    return res.status(400).json({ message: "Tài khoản tối đa 12 ký tự" });
  if (password.length < 4)
    return res.status(400).json({ message: "Mật khẩu tối thiểu 4 ký tự" });
  if (password.length > 12)
    return res.status(400).json({ message: "Mật khẩu tối đa 12 ký tự" });
  return next();
};
