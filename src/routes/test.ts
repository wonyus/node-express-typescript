import { Router } from "express";
import RequireAuth from "@Middleware/requireAuth";
import { TestControoler, TestSignPass } from "@Controller/user.controller";
const router = Router();

router.post("/", RequireAuth, TestControoler);
router.post("/signpass", RequireAuth, TestSignPass);

export default router;
