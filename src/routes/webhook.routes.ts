import { Router } from "express";
import { UpdateStatus } from "../controller/webhook.controller";
const router = Router();

router.post("/", UpdateStatus);

export default router;
