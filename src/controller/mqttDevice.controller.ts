import { Request, Response } from "express";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { decodeJWT } from "../utils/JWT";
import { IRegisterSwitch } from "../interface/basicSwitch";
import { CreateSwitch } from "../services/switch.service";
import { ResponseError, ResponseSuccess, ResponseSuccessWithCode } from "../utils/mapResponse";
import { IRegisterDevice } from "../interface/mqttDevice.interface";

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
  const scheduler = {
    days: [
      [0, false],
      [1, false],
      [2, false],
      [3, false],
      [4, false],
      [5, false],
      [6, false],
    ],
    dates: [
      [1, false],
      [2, false],
      [3, false],
      [4, false],
      [5, false],
      [6, false],
      [7, false],
      [8, false],
      [9, false],
      [10, false],
      [11, false],
      [12, false],
      [13, false],
      [14, false],
      [15, false],
      [16, false],
      [17, false],
      [18, false],
      [19, false],
      [20, false],
      [21, false],
      [22, false],
      [23, false],
      [24, false],
      [25, false],
      [26, false],
      [27, false],
      [28, false],
      [29, false],
      [30, false],
      [31, false],
    ],
    months: [
      [1, false],
      [2, false],
      [3, false],
      [4, false],
      [5, false],
      [6, false],
      [7, false],
      [8, false],
      [9, false],
      [10, false],
      [11, false],
      [12, false],
    ],
    times: [["2024-05-03T00:00:00+07:00", "2024-05-03T15:30:00+07:00"]],
  };
  const formData: IRegisterSwitch[] = [];
  for (let i = 0; i < regisFormdata.switch_amount; i++) {
    formData.push({
      client_id: resData.id,
      mqtt_client_id: regisFormdata.client_id,
      scheduler: scheduler,
    } as IRegisterSwitch);
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
