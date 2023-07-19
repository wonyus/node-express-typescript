import mqtt, { IDisconnectPacket, MqttClient } from "mqtt";
import { mqtt_host, mqtt_password, mqtt_port, mqtt_path, mqtt_user, mqtt_protocol } from "./constant";
import { SubScibeSwitch } from "../controller/topic.controller";
import { Tconnect, Tswitch, Ttype } from "../interface/topic";

class MqttConnection {
  private client: MqttClient;

  constructor(host: string, port: number, username: string, password: string, protocol: any, path: string) {
    const options = {
      host: host,
      port: port,
      username: username,
      password: password,
      protocol: protocol,
    };

    this.client = mqtt.connect(options);

    this.client.on("connect", () => {
      this.client.subscribe([Tconnect, Tswitch, "connections/count"], function (err) {
        if (!err) {
          mqttClient.publish(Tconnect, "server node js connected ", function (err) {
            if (err) {
              console.error("MQTT Publish error:", err);
            }
          });
        }
      });
    });

    this.client.on("message", (topic: string, message: Buffer) => {
      console.log("Connected clients:", topic);

      if (topic === "$SYS/broker/clients/connected") {
        const clients = JSON.parse(message.toString());
        console.log("Connected clients:", clients);
      }
      SubScibeSwitch(topic as Ttype, message);
    });

    this.client.on("error", (error: Error) => {
      console.error("MQTT error:", error);
    });

    this.client.on("disconnect", (packet: IDisconnectPacket) => {
      console.error("MQTT disconnect:", packet);
    });

    this.client.on("close", () => {
      console.log("MQTT connection closed");
    });
  }

  getClient(): MqttClient {
    return this.client;
  }
}

const mqttConnection = new MqttConnection(mqtt_host, mqtt_port, mqtt_user, mqtt_password, mqtt_protocol, mqtt_path);
const mqttClient = mqttConnection.getClient();

export default mqttClient;
