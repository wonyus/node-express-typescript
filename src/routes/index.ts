import express, { Router } from "express";
import UserRoute from "./user.routes";
import MqttClientRoute from "./mqttUser.routes";
import MqttWebhookRoute from "./webhook.routes";
import DeviceRoute from "./device.routes";

const router = Router();
router.use(express.json());

// router.use("/test", test);

router.use("/user", UserRoute);
router.use("/client", MqttClientRoute);
router.use("/webhook", MqttWebhookRoute);
router.use("/device", DeviceRoute);

export default router;
