import { Request, Response } from "express";
import { ERROR_INTERNAL } from "../contants/contants";
import { Cart } from "../models/cart.model";
import { viewCartSQL } from "../sql/viewCart.sql";
import { FormResponse } from "../type";

export const cartController = async (
  req: Request<{}, {}, Cart>,
  res: Response<FormResponse<any>>
) => {
  const { product_id } = req.body;
  try {
    if (!product_id)
      return res.status(400).json({ message: "Thiếu id sản phẩm" });
    await Cart.create({ product_id, user_id: req.user_id });
    return res.status(200).json({ message: "Thêm sản phẩm thành công" });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};

export const viewCart = async (
  req: Request<{}, {}, {}, { page: number; size: number }>,
  res: Response<FormResponse<any>>
) => {
  let { page, size } = req.query;
  if (typeof page === "string") {
    Number(page);
  }
  if (typeof size === "string") {
    Number(size);
  }
  try {
    const { dataCart, dataCount } = await viewCartSQL({ page, size });
    if (dataCount && dataCount.length) {
      console.log("dataCount:::", dataCount[0].total);
    }
    const newData = dataCart?.map((item) => {
      return {
        ...item,
        image: `http://localhost:${process.env.PORT}/${item.image}`,
      };
    });
    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: newData,
      status: 200,
      totalElements: dataCount && dataCount[0].total,
    });
  } catch (error) {
    console.log("error::::", error);
    return ERROR_INTERNAL(res);
  }
};
