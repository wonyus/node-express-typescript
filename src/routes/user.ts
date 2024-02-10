import { Router } from "express";
import validateBody from "@Middleware/validateBody";
import { ChangePasswordUser, GetUserInfo, PublishMessage, PublishMessageBulk, RefreshToken, SignIn, Signup } from "@Controller/user.controller";
import { JChangePasswordUserReqSchema, JCreateUserReqSchema, JSignInUserReqSchema } from "@Interface/user.interface";
import { JPublishBulkReqSchema, JPublishReqSchema } from "@Interface/publish.interface";
import usePassport from "@Middleware/usePassport";
import { GetClientStatusByUser } from "@Controller/mqttUser.controller";
import { SignInOAuth } from "@Controller/oauth.comtroller";
import { JSignInUserOAuthReqSchema } from "@Interface/oauth.interface";

const router = Router();

router.get("", usePassport, GetUserInfo);
router.post("/signup", validateBody(JCreateUserReqSchema), Signup);
router.post("/signin", validateBody(JSignInUserReqSchema), SignIn);
router.post("/signin_oauth", validateBody(JSignInUserOAuthReqSchema), SignInOAuth);
router.post("/refresh", usePassport, RefreshToken);
router.post("/change_password", usePassport, validateBody(JChangePasswordUserReqSchema), ChangePasswordUser);
router.post("/publish", usePassport, validateBody(JPublishReqSchema), PublishMessage);
router.post("/publish/bulk", usePassport, validateBody(JPublishBulkReqSchema), PublishMessageBulk);
router.get("/get_device_status", usePassport, GetClientStatusByUser);

export default router;
