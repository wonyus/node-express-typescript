import { Router } from "express";
import { DeleteClient, GetClientStatusByUser, RegisterClient } from "../controller/mqttDevice.controller";
import validateBody from "../middleware/validateBody";
import { JDeleteDeviceSchema, JRegisterClientSchema } from "../interface/mqttDevice.interface";
import { JChangePasswordMqttUserReqSchema } from "../interface/mqttUser.interface";
import { ChangePasswordMqttUser } from "../controller/mqttUser.controller";
import usePassport from "../middleware/usePassport";

const router = Router();
router.post("/change_password", usePassport, validateBody(JChangePasswordMqttUserReqSchema), ChangePasswordMqttUser);
router.post("/register_client", usePassport, validateBody(JRegisterClientSchema), RegisterClient);
router.post("/delete", usePassport, validateBody(JDeleteDeviceSchema), DeleteClient);
router.get("/client_status", usePassport, GetClientStatusByUser);

export default router;
