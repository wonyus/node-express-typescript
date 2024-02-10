import { Router } from "express";
import { UpdateStatus } from "@Controller/webhook.controller";
const router = Router();

router.post("/", UpdateStatus);

export default router;
