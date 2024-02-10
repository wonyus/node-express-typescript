import { Request, Response } from "express";
import {
  CreateUser,
  FindOneClientByUserId,
  Publish,
  PublishBulk,
  SignInUser,
  GetUserById,
  FindOneUser,
  ChangePassword,
} from "../services/user.service";
import { User, generateAccessJWT, generateRefreshJWT } from "../utils/JWT";
import { encryptPassword, validatePassword } from "../utils/bcrypt";
import { IChangePasswordUserReq, IChangePasswordUserSrv, ICreateUserReq, ISignInUserReq } from "@Interface/user.interface";
import { IPublishReq } from "@Interface/publish.interface";
import { CreateMqttUser } from "../services/mqttUser.service";
import { UserModel } from "../model/user.model";
import { ResponseErrorWithCode } from "../utils/mapResponse";

export async function Signup(req: Request, res: Response) {
  // encryptPassword
  const password: string = await encryptPassword(req.body.password);

  //Mapdata
  const userFormData: ICreateUserReq = {
    name: String(req.body.name),
    username: String(req.body.username),
    password: password,
    is_superuser: Boolean(req.body.is_superuser),
  };

  const checkUser = await FindOneUser(userFormData.username);
  if (checkUser != null) {
    return ResponseErrorWithCode(res, 500, "Bad Request", "username is already");
  }
  //create user to DB
  const userRes: any = await CreateUser(userFormData);
  if (userRes?.error) {
    return res.status(500).json({ error: "Bad Request", message: userRes?.error });
  }

  //create mqtt user to DB
  const mqttUserRes: any = await CreateMqttUser(userRes.id, userFormData);
  if (mqttUserRes?.error) {
    return res.status(500).json({ error: "Bad Request", message: userRes?.error });
  }

  return res.status(201).json({ message: "success", result: { user: userRes } });
}

export async function SignIn(req: Request, res: Response) {
  const userFormData: ISignInUserReq = {
    username: String(req.body.username),
    password: String(req.body.password),
  };

  //get user
  const userRes: any = await SignInUser(userFormData.username);
  if (userRes?.error || userRes == null) {
    return res.status(500).json({ error: "user or password invalid" });
  }

  //validate password
  const validate = await validatePassword(userFormData.password, userRes.password);
  if (!validate) {
    return res.status(500).json({ error: "user or password invalid" });
  }
  delete userRes.dataValues.password;

  //sign jtw
  const signAccessTokenJwt = generateAccessJWT(userRes);
  const signRefreshTokenTokenJwt = generateRefreshJWT(userRes);

  return res
    .status(200)
    .json({ message: "success", result: { user: userRes, accessToken: signAccessTokenJwt, refreshToken: signRefreshTokenTokenJwt } });
}

export async function RefreshToken(req: Request, res: Response) {
  const user = req.user as UserModel;

  //get user
  const userRes: any = await FindOneUser(user.username);
  const userData: User = {
    id: String(user.id),
    username: user.username,
  };

  if (user == null) {
    return res.status(404).json({ message: "not found", result: user });
  }
  //sign jtw
  const signAccessTokenJwt = generateAccessJWT(userData);
  const signRefreshTokenTokenJwt = generateRefreshJWT(userData);

  return res
    .status(200)
    .json({ message: "success", result: { user: userRes, accessToken: signAccessTokenJwt, refreshToken: signRefreshTokenTokenJwt } });
}

export async function GetUserInfo(req: Request, res: Response) {
  const user = req.user as UserModel;

  if (user == null) {
    return res.status(404).json({ message: "not found", result: user });
  }
  return res.status(200).json({ message: "success", result: user });
}

export async function FindClientByUserIds(req: Request, res: Response) {
  const user = req.user as UserModel;
  const ClientId = req.body.clientId;

  const client = await FindOneClientByUserId(String(user.id), ClientId);
  if (client == null) {
    return res.status(404).json({ message: "not found", result: client });
  }
  return res.status(200).json({ message: "success", result: client });
}

export async function PublishMessage(req: Request, res: Response) {
  const formData: IPublishReq = {
    topic: req.body.topic,
    qos: req.body.qos,
    payload: req.body.payload,
    retain: req.body.retain,
  };
  const clientRes: any = await Publish(formData);

  if (clientRes == null) {
    return res.status(404).json({ message: "not found", result: clientRes });
  }
  return res.status(200).json({ message: "success", result: clientRes.data });
}

export async function PublishMessageBulk(req: Request, res: Response) {
  const formData: IPublishReq[] = req.body;
  const clientRes: any = await PublishBulk(formData);

  if (clientRes == null) {
    return res.status(404).json({ message: "not found", result: clientRes });
  }
  return res.status(200).json({ message: "success", result: clientRes.data });
}

export async function TestControoler(req: Request, res: Response) {
  return res.status(200).json({ message: "success", result: req.body });
}

export async function TestSignPass(req: Request, res: Response) {
  const password: string = await encryptPassword(req.body.password);

  return res.status(200).json({ message: "success", result: password });
}

export async function ChangePasswordUser(req: Request, res: Response) {
  //Get data from req
  const userData = req.user as UserModel;
  const formData: IChangePasswordUserReq = req.body;

  //Get User info
  const user: any = await GetUserById(String(userData.id));

  //validate password
  const validate = await validatePassword(formData.old_password, user.password);
  if (!validate) {
    return res.status(500).json({ error: "user or password invalid" });
  }

  //Process
  const new_password = await encryptPassword(formData.new_password);
  const mockData: IChangePasswordUserSrv = { uid: String(userData.id), new_password: new_password };
  const result = await ChangePassword(mockData);

  //validate and response
  if (result.error) {
    return res.status(500).json({ error: result?.error });
  }

  //Response
  return res.status(200).json({ message: "success", result: result });
}
