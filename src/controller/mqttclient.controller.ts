import { Request, Response } from "express";
import { IRegisterClient } from "../interface/mqttclient.interface";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqtt_client.service";
import { decodeJWT } from "../utils/JWT";

export async function RegisterClient(req: Request<never, never, IRegisterClient, never, never>, res: Response) {
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const regisFormdata: IRegisterClient = req.body;
  const resData = await CreateDevice(decode.userId, regisFormdata);
  if (resData?.error) {
    return res.status(500).json({ error: resData?.error });
  }
  return res.status(201).json({ message: "success", result: resData });
}

export async function GetClientStatusByUser(req: Request, res: Response) {
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const resClientConn = await GetClientConnectByUser(decode.username);
  const resClientAll: any = await FindClientByUserId(decode.userId);

  if (resClientAll.error) {
    return res.status(500).json({ error: resClientAll?.error });
  }

  const result: { client_id: string; connected: boolean }[] = [];
  const connected: string[] = resClientConn.data.data.map((val: any) => val.clientid);

  resClientAll.forEach((valAll: any) => {
    result.push({ client_id: valAll.client_id, connected: connected.includes(valAll.client_id) });
  });
  return res.status(200).json({ message: "success", result: result });
}
