import { Request, Response } from "express";
import { User } from "../models/user.model";
import { FormResponse } from "../type";
import { userType } from "../type/user.type";
import jwt from "jsonwebtoken";
import { ERROR_INTERNAL } from "../contants/contants";

const loginController = async (
  req: Request<{}, {}, Pick<userType, "username" | "password">>,
  res: Response<FormResponse<any>>
) => {
  const { username } = req.body;
  try {
    const userInfo = await User.findOne({
      where: { username },
      attributes: ["username", "user_id", "phone_number", "email", "is_active"],
    });
    if (!userInfo)
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    if (!userInfo.is_active) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }
    const token = jwt.sign(
      { username, user_id: userInfo.user_id },
      process.env.TOKEN_KEY as jwt.Secret,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({
      data: { ...userInfo.dataValues, token },
      message: "Đăng nhập thành công",
      status: 200,
    });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export default loginController;
