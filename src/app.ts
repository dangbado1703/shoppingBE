import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
import Express, { Application } from "express";
import db from "./config/config";
import { requestMiddleWare } from "./middleware/request.middleware";
import categoryRouter from "./router/category.router";
import loginRouter from "./router/login.router";
import productsRouter from "./router/products.router";
import searchRouter from "./router/searchUser.router";
import userRouter from "./router/user.router";
import getDataRouter from "./router/getData.router";

db;
declare module "express-serve-static-core" {
  interface Request {
    username?: string;
    fileValidationError?: string;
    user_id?: string;
  }
}
const app: Application = Express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(Express.static(__dirname + "/assets"));
app.use("/shopping/user", loginRouter);
app.use("/shopping/user", userRouter);
app.use("/shopping/products", getDataRouter);
app.use(requestMiddleWare);
app.use("/shopping/search", searchRouter);
app.use("/shopping/category", categoryRouter);
app.use("/shopping/products", productsRouter);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
