import { Request, Response } from "express";
import { ERROR_INTERNAL } from "../contants/contants";
import { searchUser } from "../sql/searchUser";
import { FormResponse } from "../type";
import { FormSearchUser } from "../type/searchUser.type";
import { userType } from "../type/user.type";

export const searchUserController = async (
  req: Request<{}, {}, Partial<FormSearchUser>, { page: number; size: number }>,
  res: Response<FormResponse<Omit<userType, "password">[]>>
) => {
  const { page, size } = req.query;
  const searchObj = req.body;
  try {
    const offset = (+page - 1) * +size;
    const { dataSearch, dataCount }: any = await searchUser({
      ...searchObj,
      offset: offset.toString(),
      size: size.toString(),
    });
    return res.status(200).json({
      message: "Lấy thông tin thành công",
      status: 200,
      data: dataSearch,
      totalElements: dataCount[0].total,
    });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};
