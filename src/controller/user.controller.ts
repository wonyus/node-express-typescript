import { Request, Response } from "express";
import {
  CreateClient,
  CreateUser,
  FindOneClientByUserId,
  Publish,
  PublishBulk,
  SignInUser,
  FindOneUser,
} from "../services/user.service";
import { decodeJWT, generateJWT } from "../utils/JWT";
import { encryptPassword, validatePassword } from "../utils/bcrypt";
import { ICreateUserReq, ICreateClientReq, ISignInUserReq } from "../interface/user.interface";
import { IPublishReq } from "../interface/publish.interface";

export async function Signup(req: Request, res: Response) {
  // encryptPassword
  const password: string = await encryptPassword(req.body.password);

  //Mapdata
  const userFormData: ICreateUserReq = {
    name: String(req.body.name),
    username: String(req.body.username),
    password: password,
  };
  const clientFormData: ICreateClientReq = {
    user_id: String(req.body.username),
    password: String(req.body.password),
  };

  //create user to DB
  const userRes: any = await CreateUser(userFormData);
  if (userRes?.error) {
    return res.status(500).json({ error: "Bad Request", message: userRes?.error });
  }
  //create client to emqx
  const clientRes = await CreateClient(clientFormData);
  if (userRes?.error) {
    return res.status(500).json({ error: "Bad Request", message: clientRes?.data });
  }

  return res.status(201).json({ message: "success", result: { user: userRes, client: clientRes.data } });
}

export async function SignIn(req: Request, res: Response) {
  const userFormData: ISignInUserReq = {
    username: String(req.body.username),
    password: String(req.body.password),
  };

  //get user
  const userRes: any = await SignInUser(userFormData.username);
  if (userRes?.error) {
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
  return res.status(201).json({ message: "success", result: { user: userRes, token: signJwt } });
}

export async function GetUserInfo(req: Request, res: Response) {
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);

  const user = await FindOneUser(decode.username);
  if (user == null) {
    return res.status(404).json({ message: "not found", result: user });
  }
  return res.status(200).json({ message: "success", result: user });
}

export async function FindClientByUserIds(req: Request, res: Response) {
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const ClientId = req.body.clientId;

  const client = await FindOneClientByUserId(decode.userId, ClientId);
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
