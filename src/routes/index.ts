import express, { Express, Request, Response, Router } from "express";
import test from "./test";
import UserRoute from "./user";
import DeviceRoute from "./device";
import MqttClientRoute from "./mqttclient";
import RequireAuth from "../middleware/requireAuth";

const router = Router();

router.use(express.json());

router.use("/test", test);

router.use("/user", UserRoute);
router.use("/client", RequireAuth, MqttClientRoute);
router.use("/devices", RequireAuth, DeviceRoute);

export default router;
