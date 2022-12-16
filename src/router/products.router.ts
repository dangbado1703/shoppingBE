import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import storage, { imageFilter } from "../contants/upload";
import {
  createProductsController,
  detailProductController,
  getBannerController,
  getBestSellerController,
  getFeaturedController,
  searchProductsController,
  updateProductController,
} from "../controller/products.controller";
import { uploadMiddleware } from "../middleware/upload.middleware";
import { validateProducts } from "../validate/validateProducts";
const Router = express.Router();

Router.post("/search", searchProductsController);
const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
  "image_product"
);
Router.post(
  "/upload",
  (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ err });
      } else if (err) {
        return res.status(400).json({ err });
      }
      return next();
    });
  },
  validateProducts,
  uploadMiddleware,
  createProductsController
);

Router.post(
  "/update",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ err });
      } else if (err) {
        return res.status(400).json({ err });
      }
      return next();
    });
  },
  validateProducts,
  updateProductController
);

export default Router;
