import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "../configs/db.config";

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>;
  o_id: number;
  name: string;
  username: string;
  password: string;
  signin_type: string;
  profile_url: string;
  provider: string;
}

export const User = sequelize.define<UserModel>(
  "User",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    o_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    signin_type: {
      type: DataTypes.STRING,
      defaultValue: "credentials",
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "users", paranoid: true }
);
