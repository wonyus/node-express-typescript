import { Request, Response } from "express";
import { IRegisterClient } from "../interface/mqttclient.interface";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { decodeJWT } from "../utils/JWT";
import { IChangePasswordMqttUserReq, IChangePasswordMqttUserSrv } from "../interface/mqttUser.interface";
import { encryptPassword, validatePassword } from "../utils/bcrypt";
import { ChangePassword, FindMqttUserByUserId } from "../services/mqttUser.service";

export async function RegisterClient(req: Request, res: Response) {
  //Get data from req
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const regisFormdata: IRegisterClient = req.body;

  //Process
  const resData = await CreateDevice(decode.userId, regisFormdata);

  //validate and response
  if (resData?.error) {
    return res.status(500).json({ error: resData?.error });
  }
  return res.status(201).json({ message: "success", result: resData });
}

export async function ChangePasswordMqttUser(req: Request, res: Response) {
  //Get data from req
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const formData: IChangePasswordMqttUserReq = req.body;

  //Get Mqtt User info
  const mqtt_user: any = await FindMqttUserByUserId(decode.userId, formData.mqtt_username);

  //validate password
  const validate = await validatePassword(formData.old_password, mqtt_user.password);
  if (!validate) {
    return res.status(500).json({ error: "user or password invalid" });
  }

  //Process
  const new_password = await encryptPassword(formData.new_password);
  const mockData: IChangePasswordMqttUserSrv = { mqtt_username: formData.mqtt_username, new_password: new_password };
  const result: any = await ChangePassword(mockData);

  //validate and response
  if (result.error) {
    return res.status(500).json({ error: result?.error });
  }

  //Response
  return res.status(200).json({ message: "success", result: result });
}
