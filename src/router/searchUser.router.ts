import express from "express";
import { searchUserController } from "../controller/searchUser.controller";
const Router = express.Router();

Router.post("/user", searchUserController);
export default Router;
