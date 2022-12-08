import { Response } from "express";
export const ERROR_INTERNAL = (res: Response) =>
  res.status(500).json({ message: "Internal server" });

export const validateRequired = (data: any[]) => {
  let message;
  let status_rules;
  data.forEach((item, index) => {
    if (item.required && !item.value) {
      message = `${item.name} là trường bắt buộc`;
      status_rules = 400;
    }
  });
  return { message, status_rules };
};
