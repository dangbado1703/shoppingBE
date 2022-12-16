import express from "express";
import { searchCategoryController } from "../controller/category.controller";
import {
  detailProductController,
  getBannerController,
  getBestSellerController,
  getFeaturedController,
  searchProductsController,
} from "../controller/products.controller";
import { addRatingController } from "../controller/rating.controller";
import { requestMiddleWare } from "../middleware/request.middleware";
import { validateRating } from "../validate/validateRating";

const Router = express.Router();

Router.get("/get-featured", getFeaturedController);
Router.get("/get-banner", getBannerController);
Router.get("/get-best-seller", getBestSellerController);
Router.post("/search", searchProductsController);
Router.post("/get-category", searchCategoryController);
Router.get("/detail", detailProductController);
Router.post("/add-review", validateRating, addRatingController);

export default Router;
