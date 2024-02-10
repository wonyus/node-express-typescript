import { Model, InferAttributes, DataTypes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../configs/db.config";
import { User } from "./user.model";

export interface MqttUserModel extends Model<InferAttributes<MqttUserModel>, InferCreationAttributes<MqttUserModel>> {
  id: CreationOptional<number>;
  uid: number;
  username: string;
  password: string;
  is_superuser: boolean;
}

export const MqttUser = sequelize.define<MqttUserModel>(
  "MqttUser",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    uid: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
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
    is_superuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { tableName: "mqtt_users", paranoid: true }
);

MqttUser.belongsTo(User, { foreignKey: "uid" });
