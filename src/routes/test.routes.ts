import { Router } from "express";
import RequireAuth from "../middleware/requireAuth";
import { TestControoler, TestSignPass } from "../controller/user.controller";
const router = Router();

router.post("/", RequireAuth, TestControoler);
router.post("/signpass", RequireAuth, TestSignPass);

export default router;
