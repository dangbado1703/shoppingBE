import { Sequelize } from "sequelize";
import cartModal, { Cart } from "../models/cart.model";
import categoryModel, { Category } from "../models/category.model";
import detailRatingModel, { DetailRating } from "../models/detail_rating.model";
import productsModel, { Products } from "../models/products.model";
import productCategory, {
  Product_Category,
} from "../models/product_category.model";
import UserModel, { User } from "../models/user.model";
const USER_NAME = process.env.USER_NAME as string;
const PASSWORD = process.env.PASSWORD as string;
const sequelize = new Sequelize("shopping", USER_NAME, PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

interface IFormDB {
  sequelize?: Sequelize;
  User?: typeof User;
  Category?: typeof Category;
  Products?: typeof Products;
  Product_Category?: typeof Product_Category;
  DetailRating?: typeof DetailRating;
  Cart?: typeof Cart;
}

const db: IFormDB = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize);
db.Category = categoryModel(sequelize);
db.Products = productsModel(sequelize);
db.Product_Category = productCategory(sequelize);
db.DetailRating = detailRatingModel(sequelize);
db.Cart = cartModal(sequelize);

export default db;
