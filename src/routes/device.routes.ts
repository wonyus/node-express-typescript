import { Router } from "express";
import usePassport from "../middleware/usePassport";
import validateBody from "../middleware/validateBody";
import { UpdateSwitchDevice } from "../controller/devices.controller";
import { JSwitchDeviceSchema } from "../interface/device.interface";

const router = Router();

router.post("/switches/update", usePassport, validateBody(JSwitchDeviceSchema), UpdateSwitchDevice);

export default router;
