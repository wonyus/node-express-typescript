import { IClientSubscribeOptions } from "mqtt";
import mqttClient from "../configs/mqtt_connect";

const Subscribe = (topic: string | string[], callback: (err?: Error) => void) => {
  mqttClient.subscribe(topic, function (err) {
    if (err) {
      console.error("MQTT Subscribe error:", err);
      callback(err);
    } else {
      callback();
    }
  });
};

const SubscribeWithOption = (
  topic: string | string[],
  otp: IClientSubscribeOptions,
  callback: (err?: Error) => void
) => {
  mqttClient.subscribe(topic, otp, function (err) {
    if (err) {
      console.error("MQTT SubscribeWithOption error:", err);
      callback(err);
    } else {
      callback(err);
    }
  });
};

export default Subscribe;
export { Subscribe, SubscribeWithOption };
