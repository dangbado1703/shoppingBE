import { NextFunction, Request, Response } from "express";
import { ERROR_INTERNAL } from "../contants/contants";
import { Cart } from "../models/cart.model";
import { FormResponse } from "../type";

export const checkTotalCartMiddleware = async (
  req: Request<{}, {}, Cart>,
  res: Response<FormResponse<any>>,
  next: NextFunction
) => {
  const { product_id } = req.body;
  try {
    const data = await Cart.findOne({ where: { product_id } });
    if (!data) return next();
    if (data.total) {
      await Cart.update({ total: data.total + 1 }, { where: { product_id } });
    }
    return res
      .status(200)
      .json({ message: "Thêm sản phẩm thành công", status: 200 });
  } catch (error) {
    console.log("error", error);
    return ERROR_INTERNAL(res);
  }
};
