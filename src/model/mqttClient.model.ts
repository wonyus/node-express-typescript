import { Model, InferAttributes, DataTypes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../configs/db.config";
import { User } from "./user.model";

export interface MqttClientModel extends Model<InferAttributes<MqttClientModel>, InferCreationAttributes<MqttClientModel>> {
  id: CreationOptional<number>;
  uid: number;
  client_id: string;
  type: string;
  status: string;
}

export const MqttClient = sequelize.define<MqttClientModel>(
  "MqttClient",
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
    client_id: {
      unique: true,
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "mqtt_clients", paranoid: true }
);

MqttClient.belongsTo(User, { foreignKey: "uid" });
