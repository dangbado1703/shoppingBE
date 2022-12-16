import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export class DetailRating extends Model<
  InferAttributes<DetailRating>,
  InferCreationAttributes<DetailRating>
> {
  declare id?: CreationOptional<number>;
  declare product_id?: number;
  declare user_id?: string;
  declare star?: number;
  declare comment?: string;
  declare updatedAt?: Date;
  declare createdAt?: Date;
}

const detailRatingModel = (sequelize: Sequelize) => {
  return DetailRating.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      star: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      comment: {
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
    },
    { sequelize, tableName: "detail_rating" }
  );
};

export default detailRatingModel;
