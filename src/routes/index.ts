import express, { Router } from "express";
import UserRoute from "./user";
import MqttClientRoute from "./mqttClient";
import MqttWebhookRoute from "./webhook";

const router = Router();

router.use(express.json());

// router.use("/test", test);

router.use("/user", UserRoute);
router.use("/client", MqttClientRoute);
router.use("/webhook", MqttWebhookRoute);

export default router;
