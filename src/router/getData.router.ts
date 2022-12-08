import express from "express";
import { searchCategoryController } from "../controller/category.controller";
import {
  getBannerController,
  getBestSellerController,
  getFeaturedController,
  searchProductsController,
} from "../controller/products.controller";

const Router = express.Router();

Router.get("/get-featured", getFeaturedController);
Router.get("/get-banner", getBannerController);
Router.get("/get-best-seller", getBestSellerController);
Router.post("/search", searchProductsController);
Router.post("/get-category", searchCategoryController);

export default Router;
