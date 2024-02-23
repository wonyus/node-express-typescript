import { Request, Response } from "express";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { decodeJWT } from "../utils/JWT";
import { IRegisterSwitch } from "../interface/basicSwitch";
import { CreateSwitch } from "../services/switch.service";
import { ResponseError, ResponseSuccess, ResponseSuccessWithCode } from "../utils/mapResponse";
import { IRegisterDevice } from "@Interface/mqttClient.interface";

export async function RegisterClient(req: Request, res: Response) {
  //Get data from req
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
  const regisFormdata: IRegisterDevice = req.body;

  //Process
  const resData = await CreateDevice(decode.userId, regisFormdata);
  //validate and response
  if ("error" in resData) {
    return ResponseError(res, "fail to create device", resData?.error);
  }

  const formData: IRegisterSwitch[] = [];
  for (let i = 0; i < regisFormdata.switch_amount; i++) {
    formData.push({ client_id: resData.id, mqtt_client_id: regisFormdata.client_id, status: false } as IRegisterSwitch);
  }

  const resCreateSwitch = await CreateSwitch(formData);
  //validate and response
  if ("error" in resCreateSwitch) {
    return ResponseError(res, "fail to create switch", resCreateSwitch?.error);
  }

  return ResponseSuccessWithCode(res, 201, "created", resData);
}

export async function GetClientStatusByUser(req: Request, res: Response) {
  //Get data from req
  const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);

  //Process
  const resClientConn = await GetClientConnectByUser(decode.username);
  const resClientAll = await FindClientByUserId(decode.userId);

  //validate and response
  if ("error" in resClientConn) {
    return ResponseError(res, "fail to get client connection", resClientConn?.error);
  }
  if ("error" in resClientAll) {
    return ResponseError(res, "fail to get client", resClientAll?.error);
  }

  //Process
  const result: { client_id: string; connected: boolean }[] = [];
  const connected: string[] = resClientConn?.data.data.map((val: any) => val.clientid);

  resClientAll.forEach((valAll: any) => {
    result.push({ client_id: valAll.client_id, connected: connected.includes(valAll.client_id) });
  });

  //Response
  return ResponseSuccess(res, result);
}
