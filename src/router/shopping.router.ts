import express from "express";
import { addRatingController } from "../controller/rating.controller";
import { validateRating } from "../validate/validateRating";

const Router = express.Router();

Router.post("/add-review", validateRating, addRatingController);

export default Router;
