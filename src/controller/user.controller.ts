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
import { generateJWT } from "../utils/JWT";
import { encryptPassword, validatePassword } from "../utils/bcrypt";
import { IChangePasswordUserReq, IChangePasswordUserSrv, ICreateUserReq, ISignInUserReq } from "../interface/user.interface";
import { IPublishReq } from "../interface/publish.interface";
import { CreateMqttUser } from "../services/mqttUser.service";
import { UserModel } from "../model/user.model";

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
  const signJwt = generateJWT(userRes);
  return res.status(200).json({ message: "success", result: { user: userRes, token: signJwt } });
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
  const clientRes = await Publish(formData);

  if (clientRes == null) {
    return res.status(404).json({ message: "not found", result: clientRes });
  }
  return res.status(200).json({ message: "success", result: clientRes.data });
}

export async function PublishMessageBulk(req: Request, res: Response) {
  const formData: IPublishReq[] = req.body;
  const clientRes = await PublishBulk(formData);

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
