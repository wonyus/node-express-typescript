import { Router } from "express";
import { GetClientStatusByUser, RegisterClient } from "../controller/mqttclient.controller";
import RequireAuth from "../middleware/requireAuth";

const router = Router();

router.post("/register_client", RequireAuth, RegisterClient);
router.get("/client_status", RequireAuth, GetClientStatusByUser);

export default router;
