import { Router } from "express";
import validateBody from "../middleware/validateBody";
import { ChangePasswordUser, GetUserInfo, PublishMessage, PublishMessageBulk, SignIn, Signup } from "../controller/user.controller";
import { JChangePasswordUserReqSchema, JCreateUserReqSchema, JSignInUserReqSchema } from "../interface/user.interface";
import { JPublishBulkReqSchema, JPublishReqSchema } from "../interface/publish.interface";
import usePassport from "../middleware/usePassport";
import { GetClientStatusByUser } from "../controller/mqttUser.controller";

const router = Router();

router.get("", usePassport, GetUserInfo);
router.post("/signup", validateBody(JCreateUserReqSchema), Signup);
router.post("/signin", validateBody(JSignInUserReqSchema), SignIn);
router.post("/change_password", usePassport, validateBody(JChangePasswordUserReqSchema), ChangePasswordUser);
router.post("/publish", usePassport, validateBody(JPublishReqSchema), PublishMessage);
router.post("/publish/bulk", usePassport, validateBody(JPublishBulkReqSchema), PublishMessageBulk);
router.get("/get_device_status", usePassport, GetClientStatusByUser);

export default router;
