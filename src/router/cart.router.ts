import express from "express";
import { cartController, viewCart } from "../controller/cart.controller";
import { checkTotalCartMiddleware } from "../middleware/checkTotalCart.middleware";
const Router = express.Router();
Router.post("/add-to-cart", checkTotalCartMiddleware, cartController);
Router.get("/view-cart", viewCart);

export default Router;
