import { Router } from "express";
import validateBody from "../middleware/validateBody";
import { ChangePasswordUser, GetUserInfo, PublishMessage, PublishMessageBulk, RefreshToken, SignIn, Signup } from "../controller/user.controller";
import { JChangePasswordUserReqSchema, JCreateUserReqSchema, JSignInUserReqSchema } from "../interface/user.interface";
import { JPublishBulkReqSchema, JPublishReqSchema } from "../interface/publish.interface";
import usePassport from "../middleware/usePassport";
import { GetClientStatusByUser } from "../controller/mqttUser.controller";
import { SignInOAuth } from "../controller/oauth.controller"; // Fixed typo in controller import
import { JSignInUserOAuthReqSchema } from "../interface/oauth.interface";

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
