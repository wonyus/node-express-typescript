import { Request, Response } from "express";
import { ISignInUserOAuthReq } from "@Interface/oauth.interface";
import { CreateUser, CreateUserOAuth, FindOneUserOAuth, UpdateUserOAuth } from "../services/user.service";
import { CreateMqttUser } from "../services/mqttUser.service";
import { generateAccessJWT, generateRefreshJWT } from "../utils/JWT";

export async function SignInOAuth(req: Request, res: Response) {
  //Get data req
  const formData: ISignInUserOAuthReq = req.body;

  //get user
  const user = await FindOneUserOAuth(formData.username, formData.provider);
  var userRes: any;
  //if not exist, create new user
  if (user == null) {
    //create user
    userRes = await CreateUserOAuth(formData);
    if (userRes?.error) {
      return res.status(500).json({ error: "Bad Request", message: userRes?.error });
    }
    //create mqtt user
    const userMqttFormData: any = {
      username: userRes.username,
      password: userRes.password,
      is_superuser: userRes.is_superuser,
    };
    const mqttUserRes: any = await CreateMqttUser(userRes.id, userMqttFormData);
    if (mqttUserRes?.error) {
      return res.status(500).json({ error: "Bad Request", message: userRes?.error });
    }
  }
  //if exist, update user
  else {
    //update user
    userRes = await UpdateUserOAuth(formData);
    if (userRes?.error) {
      return res.status(500).json({ error: "Bad Request", message: userRes?.error });
    }
  }
  //sign token
  const signAccessTokenJwt = generateAccessJWT(user as any);
  const signRefreshTokenTokenJwt = generateRefreshJWT(user as any);

  return res
    .status(200)
    .json({ message: "success", result: { user: userRes, accessToken: signAccessTokenJwt, refreshToken: signRefreshTokenTokenJwt } });
}
