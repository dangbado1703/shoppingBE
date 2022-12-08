import {
  createUser,
  deleteUser,
  detailUser,
  updateUser,
} from "../controller/user.controller";
import express from "express";
import { validateUser } from "../validate/validateUser";
import { requestMiddleWare } from "../middleware/request.middleware";
const Router = express.Router();

Router.post("/create", validateUser.create, createUser);
Router.get("/detail", requestMiddleWare, detailUser);
Router.put("/update", requestMiddleWare, updateUser);
Router.post("/delete", requestMiddleWare, deleteUser);

export default Router;
