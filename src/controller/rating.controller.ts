import { Request, Response } from "express";
import { ERROR_INTERNAL } from "../contants/contants";
import { DetailRating } from "../models/detail_rating.model";
import { FormResponse } from "../type";
import { IFormRating } from "../type/rating.type";

export const addRatingController = async (
  req: Request<{}, {}, IFormRating>,
  res: Response<FormResponse<any>>
) => {
  const { comment, product_id, star } = req.body;
  try {
    await DetailRating.create({
      comment,
      product_id,
      star,
      user_id: req.user_id,
    });
    return res.status(200).json({ message: "Thêm đánh giá thành công" });
  } catch (error) {
    console.log("error:::", error);
    return ERROR_INTERNAL(res);
  }
};
