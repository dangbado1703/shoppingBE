import { Sequelize } from "sequelize";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare user_id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare phone_number: string;
  declare email: string;
  declare is_active?: number;
  declare birthday: string | null;
}

const UserModel = (sequelize: Sequelize) => {
  return User.init(
    {
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      birthday: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      tableName: "users",
    }
  );
};

export default UserModel;
