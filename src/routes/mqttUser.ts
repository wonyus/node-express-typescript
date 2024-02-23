import { Router } from "express";
import { GetClientStatusByUser, RegisterClient } from "../controller/mqttClient.controller";
import RequireAuth from "../middleware/requireAuth";
import validateBody from "../middleware/validateBody";
import { JRegisterClientSchema } from "../interface/mqttDevice.interface";
import { JChangePasswordMqttUserReqSchema } from "../interface/mqttUser.interface";
import { ChangePasswordMqttUser } from "../controller/mqttUser.controller";

const router = Router();
router.post("/change_password", RequireAuth, validateBody(JChangePasswordMqttUserReqSchema), ChangePasswordMqttUser);
router.post("/register_client", RequireAuth, validateBody(JRegisterClientSchema), RegisterClient);
router.get("/client_status", RequireAuth, GetClientStatusByUser);

export default router;
