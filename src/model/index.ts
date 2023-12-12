import { Sequelize, SyncOptions } from "sequelize";
import { sequelize } from "../configs/db.config";
import { User } from "./user.model";
import { MqttClient } from "./mqttClient.model";
import { MqttUser } from "./mqttUser.model";
import { Switch } from "./switch.model";

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const sync = async ({ ...args }: SyncOptions) => {
  await User.sync(args);
  await MqttClient.sync(args);
  await MqttUser.sync(args);
  await Switch.sync(args);
};

export { sync };
export default db;
