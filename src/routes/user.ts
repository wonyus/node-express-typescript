import { Router } from "express";
import { GetUserInfo, PublishMessage, PublishMessageBulk, SignIn, Signup } from "../controller/user.controller";
import RequireAuth from "../middleware/requireAuth";

const router = Router();

router.get("", RequireAuth, GetUserInfo);
router.post("/signup", Signup);
router.post("/signin", SignIn);
router.post("/publish", RequireAuth, PublishMessage);
router.post("/publish/bulk", RequireAuth, PublishMessageBulk);

export default router;
