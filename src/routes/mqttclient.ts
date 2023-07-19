import { Router } from "express";
import { RegisterClient } from "../controller/mqttclient.controller";

const router = Router();

router.post("/register_client", RegisterClient);

export default router;
