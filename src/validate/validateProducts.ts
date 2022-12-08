import { NextFunction, Request, Response } from "express";
import { validateRequired } from "../contants/contants";
import { Products } from "../models/products.model";
import { FormResponse, IFormRules } from "../type";
import { IFormCreateProducts } from "../type/products.type";

export const validateProducts = (
  req: Request<{}, {}, Partial<IFormCreateProducts>>,
  res: Response<FormResponse<any>>,
  next: NextFunction
) => {
  const { product_name, product_price, facturers, stock, category_name } =
    req.body;
  const rules: IFormRules[] = [
    {
      name: "ProductName",
      required: true,
      value: product_name,
    },
    {
      name: "ProductPrice",
      required: true,
      value: product_price,
    },
    {
      name: "Category",
      required: true,
      value: category_name,
    },
    {
      name: "Facture",
      required: true,
      value: facturers,
    },
    {
      name: "Stock",
      required: true,
      value: stock,
    },
    {
      name: "Status",
      required: true,
      value: 1,
    },
  ];
  const { message, status_rules } = validateRequired(rules);
  if (message && status_rules)
    return res.status(status_rules).json({ message });
  return next();
};
