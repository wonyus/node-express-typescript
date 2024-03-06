import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "../configs/db.config";
import { MqttClient } from "./mqttClient.model";
import { TSchedulerInitialValues } from "src/interface/basicSwitch";

export interface SwitchModel extends Model<InferAttributes<SwitchModel>, InferCreationAttributes<SwitchModel>> {
  id: CreationOptional<number>;
  client_id: number;
  mqtt_client_id: string;
  name: string;
  status: boolean;
  scheduler_active: boolean;
  scheduler: TSchedulerInitialValues;
}

export const Switch = sequelize.define<SwitchModel>(
  "Switch",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: MqttClient,
        key: "id",
      },
    },
    mqtt_client_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "switch",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    scheduler_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    scheduler: {
      type: DataTypes.JSON,
    },
  },
  { tableName: "switchs", paranoid: true }
);
