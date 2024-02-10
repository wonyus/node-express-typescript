import { Request, Response } from "express";
import { IRegisterDevice } from "@Interface/mqttClient.interface";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { decodeJWT } from "../utils/JWT";
import { IChangePasswordMqttUserReq, IChangePasswordMqttUserSrv } from "@Interface/mqttUser.interface";
import { encryptPassword, validatePassword } from "../utils/bcrypt";
import { ChangePassword, FindMqttUserByUserId } from "../services/mqttUser.service";
import { UserModel } from "../model/user.model";
import { GetSwitchByClientId } from "../services/switch.service";
import { ISwitchData } from "@Interface/basicSwitch";

export async function RegisterClient(req: Request, res: Response) {
  //Get data from req
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const regisFormdata: IRegisterDevice = req.body;

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

export const GetClientStatusByUser = async (req: Request, res: Response) => {
  //Get data from req
  const user = req.user as UserModel;

  //Process
  const resClientAll: any = await FindClientByUserId(user.id);
  if (resClientAll.error) {
    return res.status(500).json({ error: resClientAll?.error });
  }
  const ClientAllString: string = JSON.stringify(resClientAll);
  const ClientAll: any = [];

  JSON.parse(ClientAllString).forEach((element: any) => {
    element.switchs = [];
    ClientAll.push(element);
  });

  ClientAll.map(async (val: any) => {
    const resSwithch: any = await GetSwitchByClientId(val.id);
    if (resSwithch == null) {
      return res.status(404).json({ error: "not fount" });
    }
    val.switchs = resSwithch;
    return val;
  });

  console.log(ClientAll)

  const resClientConn: any = await GetClientConnectByUser(user.username);
  if (resClientConn.error) {
    return res.status(500).json({ error: resClientConn?.error });
  }

  //Process
  const result: { id: number; client_id: string; status_online: boolean; data: ISwitchData[] }[] = [];
  const connected: string[] = resClientConn.data.data.map((val: any) => val.clientid);

  for (let i = 0; i < ClientAll.length; i++) {
    const client_id = ClientAll[i].client_id;
    const connected_index = connected.indexOf(client_id);
    const connected_status = connected_index != -1 ? true : false;
    const data: ISwitchData[] = ClientAll[i].switchs.map((val: any) => {
      return { client_id: client_id, switch_id: val.id, status: val.status, name: val.name, mqtt_client_id: val.mqtt_client_id };
    });
    result.push({ id: ClientAll[i].id, client_id: client_id, status_online: connected_status, data: data });
  }
  
  //Response 
  return res.status(200).json({ message: "success", result: result });
};
