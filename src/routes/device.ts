import { Router } from "express";
import BasicSwitch from "./basic_switch";

const router = Router();

router.use("/basic_switch", BasicSwitch);

export default router;
