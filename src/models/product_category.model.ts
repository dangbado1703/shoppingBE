import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class Product_Category extends Model<
  InferAttributes<Product_Category>,
  InferCreationAttributes<Product_Category>
> {
  declare id?: CreationOptional<number>;
  declare product_id?: string;
  declare category_name?: string;
  declare product_name?: string;
}
const productCategory = (sequelize: Sequelize) => {
  return Product_Category.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      category_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product_category",
      createdAt: false,
      updatedAt: false,
    }
  );
};

export default productCategory;
