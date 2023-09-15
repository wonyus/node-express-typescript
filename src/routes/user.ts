import { Router } from "express";
import validateBody from "../middleware/validateBody";
import RequireAuth from "../middleware/requireAuth";
import { GetUserInfo, PublishMessage, PublishMessageBulk, SignIn, Signup } from "../controller/user.controller";
import { JCreateUserReqSchema, JSignInUserReqSchema } from "../interface/user.interface";
import { JPublishBulkReqSchema, JPublishReqSchema } from "../interface/publish.interface";

const router = Router();

router.get("", RequireAuth, GetUserInfo);
router.post("/signup", validateBody(JCreateUserReqSchema), Signup);
router.post("/signin", validateBody(JSignInUserReqSchema), SignIn);
router.post("/publish", RequireAuth, validateBody(JPublishReqSchema), PublishMessage);
router.post("/publish/bulk", RequireAuth, validateBody(JPublishBulkReqSchema), PublishMessageBulk);

export default router;
