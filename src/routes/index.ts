import express, { Router } from "express";
import UserRoute from "./user";
import MqttClientRoute from "./mqttUser";
import MqttWebhookRoute from "./webhook";
import DeviceRoute from "./device";

const router = Router();
router.use(express.json());

// router.use("/test", test);

router.use("/user", UserRoute);
router.use("/client", MqttClientRoute);
router.use("/webhook", MqttWebhookRoute);
router.use("/device", DeviceRoute);

export default router;
