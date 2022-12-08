import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  searchCategoryController,
  updateCategoryController,
} from "../controller/category.controller";
const Router = express.Router();
Router.post("/create", createCategoryController);
Router.post("/update", updateCategoryController);
Router.post("/delete", deleteCategoryController);
Router.post("/search", searchCategoryController);

export default Router;
