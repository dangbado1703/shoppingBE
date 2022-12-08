import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class Products extends Model<
  InferAttributes<Products>,
  InferCreationAttributes<Products>
> {
  declare product_id?: string;
  declare user_id?: string;
  declare product_name?: string;
  declare product_code?: string;
  declare facturers?: string;
  declare status?: string;
  declare product_price?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare stock?: string;
  declare image?: string;
  declare is_featured?: number;
  declare is_banner?: number;
  declare sold?: number;
  declare star?: number;
}

const productsModel = (sequelize: Sequelize) => {
  return Products.init(
    {
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      facturers: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "1",
      },
      product_price: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      stock: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_banner: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      is_featured: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      sold: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      star: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
    },
    { sequelize, tableName: "products" }
  );
};

export default productsModel;
