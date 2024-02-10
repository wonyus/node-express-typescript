import { Router } from "express";
import { GetClientStatusByUser, RegisterClient } from "@Controller/mqttClient.controller";
import RequireAuth from "@Middleware/requireAuth";
import validateBody from "@Middleware/validateBody";
import { JRegisterClientSchema } from "@Interface/mqttClient.interface";
import { JChangePasswordMqttUserReqSchema } from "@Interface/mqttUser.interface";
import { ChangePasswordMqttUser } from "@Controller/mqttUser.controller";

const router = Router();
router.post("/change_password", RequireAuth, validateBody(JChangePasswordMqttUserReqSchema), ChangePasswordMqttUser);
router.post("/register_client", RequireAuth, validateBody(JRegisterClientSchema), RegisterClient);
router.get("/client_status", RequireAuth, GetClientStatusByUser);

export default router;
