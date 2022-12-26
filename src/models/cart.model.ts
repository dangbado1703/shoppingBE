import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class Cart extends Model<
  InferAttributes<Cart>,
  InferCreationAttributes<Cart>
> {
  declare id_cart: CreationOptional<number>;
  declare product_id: number;
  declare user_id: number;
  declare total?: number;
}
const cartModal = (sequelize: Sequelize) => {
  return Cart.init(
    {
      id_cart: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1,
      },
    },
    { sequelize, tableName: "cart", createdAt: false, updatedAt: false }
  );
};

export default cartModal;
