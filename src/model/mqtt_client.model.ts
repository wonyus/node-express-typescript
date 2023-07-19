import { Model, InferAttributes, DataTypes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../configs/db.config";
import { User } from "./user.model";

interface MqttClientModel extends Model<InferAttributes<MqttClientModel>, InferCreationAttributes<MqttClientModel>> {
  id: CreationOptional<number>;
  uid: number;
  client_id: string;
  type: string;
  status: string;
}

export const MqttClients = sequelize.define<MqttClientModel>(
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
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "mqtt_client", paranoid: true }
);

MqttClients.belongsTo(User, { foreignKey: "id" });
