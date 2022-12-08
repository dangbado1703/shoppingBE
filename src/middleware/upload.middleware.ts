import { NextFunction, Request, Response } from "express";
import multer from "multer";
import storage, { imageFilter } from "../contants/upload";

export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).json({ message: "Vui lòng tải lên ảnh" });
  }
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  return next();
};
