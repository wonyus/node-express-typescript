import express, { Router } from "express";
import test from "./test";
import UserRoute from "./user";
import MqttClientRoute from "./mqttClient";
import MqttWebhookRoute from "./webhook";
import RequireAuth from "../middleware/requireAuth";

const router = Router();

router.use(express.json());

// router.use("/test", test);

router.use("/user", UserRoute);
router.use("/client", MqttClientRoute);
router.use("/webhook", MqttWebhookRoute);

export default router;
