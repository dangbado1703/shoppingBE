import { NextFunction, Request, Response } from "express";
import { validateRequired } from "../contants/contants";
import { FormResponse, IFormRules } from "../type";
import { IFormRating } from "../type/rating.type";

export const validateRating = (
  req: Request<{}, {}, IFormRating>,
  res: Response<FormResponse<any>>,
  next: NextFunction
) => {
  const { comment, product_id, star, user_id } = req.body;
  const rules: IFormRules[] = [
    {
      name: "Comment",
      required: true,
      value: comment,
    },
    {
      name: "ProductId",
      required: true,
      value: product_id,
    },
    {
      name: "Star",
      required: true,
      value: star,
    },
  ];
  const { message, status_rules } = validateRequired(rules);
  if (message && status_rules) {
    return res.status(status_rules).json({ message });
  }
  return next();
};
