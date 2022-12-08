import { Request, Response } from "express";
import { ERROR_INTERNAL } from "../contants/contants";
import { User } from "../models/user.model";
import { FormResponse } from "../type";
import { userType } from "../type/user.type";

const createUser = async (
  req: Request<{}, {}, userType>,
  res: Response<FormResponse<any>>
) => {
  const { email, password, username, phone_number, birthday } = req.body;
  try {
    const userInfo = await User.findOne({ where: { username } });
    if (userInfo === null) {
      await User.create({
        email,
        password,
        phone_number,
        username,
        birthday,
      });
      return res.status(200).json({
        data: null,
        message: "Đăng ký tài khoản thành công",
        status: 200,
      });
    } else {
      return res
        .status(400)
        .json({ data: null, message: "Tài khoản đã tồn tại", status: 400 });
    }
  } catch (error) {
    console.log("error::::", error);
    return res.status(500).json({ message: "Internal server" });
  }
};

const updateUser = async (
  req: Request<{}, {}, Partial<userType>, Partial<userType>>,
  res: Response<FormResponse<any>>
) => {
  const { user_id, email, password, phone_number, is_active, birthday } =
    req.body;
  try {
    const userInfo = await User.findOne({ where: { user_id } });
    if (!userInfo) {
      return res
        .status(400)
        .json({ message: "Không tồn tại user này", status: 400 });
    }
    await User.update(
      { email, password, phone_number, is_active, birthday },
      { where: { user_id } }
    );
    return res
      .status(200)
      .json({ message: "Cập nhật thông tin thành công", status: 200 });
  } catch (error) {
    console.log("error::::", error);
    return ERROR_INTERNAL(res);
  }
};

const detailUser = async (
  req: Request<{}, {}, {}, userType>,
  res: Response<FormResponse<userType>>
) => {
  const { user_id } = req.query;
  try {
    const userInfo = await User.findOne({ where: { user_id } });
    if (!userInfo)
      return res
        .status(400)
        .json({ message: "Không tồn tại user này", status: 400 });
    return res.status(200).json({
      data: userInfo,
      message: "Lấy thông tin thành công",
      status: 200,
    });
  } catch (error) {
    console.log("error::::", error);
    return ERROR_INTERNAL(res);
  }
};

const deleteUser = async (
  req: Request<{}, {}, Partial<userType>, Partial<userType>>,
  res: Response<FormResponse<any>>
) => {
  const { user_id } = req.body;
  try {
    const userInfo = await User.findOne({ where: { user_id } });
    if (!userInfo) {
      return res
        .status(400)
        .json({ message: "Không tồn tại user này", status: 400 });
    }
    await User.update({ is_active: 0 }, { where: { user_id } });
    return res
      .status(200)
      .json({ message: "Xóa người dùng thành công", status: 200 });
  } catch (error) {
    console.log("error::::", error);
    return ERROR_INTERNAL(res);
  }
};

export { createUser, updateUser, detailUser, deleteUser };
