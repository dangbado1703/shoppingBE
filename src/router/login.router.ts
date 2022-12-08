import loginController from "../controller/login.controller";
import express from "express";
import { validateLogin } from "../validate/validateLogin";
const Router = express.Router();

Router.post("/login", validateLogin, loginController);

export default Router;
