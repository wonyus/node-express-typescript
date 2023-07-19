import { Router } from "express";

import { AppSwitchAction } from "../controller/switch.controller";

const router = Router();

router.post("/", AppSwitchAction);

export default router;
