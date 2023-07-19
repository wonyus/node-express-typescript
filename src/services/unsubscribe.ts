import mqttClient from "../configs/mqtt_connect";

const UnSubscribe = (topic: string | string[], otp: object, callback: (err?: Error) => void) => {
  mqttClient.unsubscribe(topic, otp, function (err) {
    if (err) {
      console.error("MQTT UnSubscribe error:", err);
      callback(err);
    } else {
      callback(err);
    }
  });
};

export default UnSubscribe;
