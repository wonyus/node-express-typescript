import { IClientPublishOptions } from "mqtt";
import mqttClient from "../configs/mqtt_connect";

const Publish = (topic: string, messages: any, callback: (err?: Error) => void): void => {
  console.log(1, JSON.stringify(messages).toString());
  console.log(2, messages);
  // return callback();
  mqttClient.publish(topic, JSON.stringify(messages), function (err) {
    if (err) {
      console.error("MQTT Publish error:", err);
      callback(err);
    } else {
      callback();
    }
  });
};

const PublishWithOption = (
  topic: string,
  messages: string,
  otp: IClientPublishOptions,
  callback: (err?: Error) => void
): void => {
  mqttClient.publish(topic, messages, otp, function (err) {
    if (err) {
      console.error("MQTT PublishWithOption error:", err);
      callback(err);
    } else {
      callback();
    }
  });
};

export default Publish;
export { Publish, PublishWithOption };
