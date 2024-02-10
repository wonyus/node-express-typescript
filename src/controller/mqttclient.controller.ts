import { Request, Response } from "express";
import { IRegisterDevice } from "@Interface/mqttClient.interface";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { decodeJWT } from "../utils/JWT";
import { IRegisterSwitch } from "@Interface/basicSwitch";
import { CreateSwitch } from "../services/switch.service";

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

  const formData: IRegisterSwitch[] = [];
  for (let i = 0; i < regisFormdata.switch_amount; i++) {
    formData.push({ client_id: resData.id, mqtt_client_id: regisFormdata.client_id, status: false } as IRegisterSwitch);
  }
  const resCreateSwitch = await CreateSwitch(formData);
  //validate and response
  if (resCreateSwitch?.error) {
    return res.status(500).json({ error: resCreateSwitch?.error });
  }

  return res.status(201).json({ message: "success", result: resData });
}

export async function GetClientStatusByUser(req: Request, res: Response) {
  //Get data from req
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);

  //Process
  const resClientConn: any = await GetClientConnectByUser(decode.username);
  const resClientAll: any = await FindClientByUserId(decode.userId);

  //validate and response
  if (resClientAll.error) {
    return res.status(500).json({ error: resClientAll?.error });
  }

  //Process
  const result: { client_id: string; connected: boolean }[] = [];
  const connected: string[] = resClientConn?.data.data.map((val: any) => val.clientid);

  resClientAll.forEach((valAll: any) => {
    result.push({ client_id: valAll.client_id, connected: connected.includes(valAll.client_id) });
  });

  //Response
  return res.status(200).json({ message: "success", result: result });
}
