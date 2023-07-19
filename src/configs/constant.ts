import { config } from "dotenv";
config();

const server_port: number = Number(process.env.SERVER_PORT) || 3000;
const mqtt_host: string = String(process.env.MQTT_HOST) || "localhost";
const mqtt_port: number = Number(process.env.MQTT_PORT) || 1883;
const mqtt_path: string = String(process.env.MQTT_PATH) || "/mqtt";
const mqtt_user: string = String(process.env.MQTT_USER) || "user";
const mqtt_password: string = String(process.env.MQTT_PASSWORD) || "pass";
const mqtt_protocol: string = String(process.env.MQTT_PROTOCOL) || "mqtt";

export { server_port, mqtt_host, mqtt_port, mqtt_path, mqtt_user, mqtt_password, mqtt_protocol };
