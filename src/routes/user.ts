import { Router } from "express";
import { FindClientByUserId, Signup } from "../controller/user.controller";

const router = Router();

router.post("/signup", Signup);
router.post("/client", FindClientByUserId);

export default router;
