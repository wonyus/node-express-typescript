import { Sequelize } from "sequelize";
import { sequelize } from "../configs/db.config";
import { User } from "./user.model";
import { MqttClients } from "./mqtt_client.model";

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

const sync = async () => {
  await User.sync();
  await MqttClients.sync();
};

export { sync };
export default db;
