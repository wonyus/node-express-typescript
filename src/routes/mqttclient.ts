import { Router } from "express";
import { GetClientStatusByUser, RegisterClient } from "../controller/mqttclient.controller";
import RequireAuth from "../middleware/requireAuth";
import validateBody from "../middleware/validateBody";
import { JRegisterClientSchema } from "../interface/mqttclient.interface";

const router = Router();

router.post("/register_client", RequireAuth, validateBody(JRegisterClientSchema), RegisterClient);
router.get("/client_status", RequireAuth, GetClientStatusByUser);

export default router;
