import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "../configs/db.config";

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>;
  name: string;
  username: string;
  password: string;
}

export const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "users", paranoid: true }
);
