import { Request, Response } from "express";
import { IRegisterDevice } from "../interface/mqttClient.interface";
import { CreateDevice, FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { decodeJWT } from "../utils/JWT";
import { IChangePasswordMqttUserReq, IChangePasswordMqttUserSrv } from "../interface/mqttUser.interface";
import { encryptPassword, validatePassword } from "../utils/bcrypt";
import { ChangePassword, FindMqttUserByUserId } from "../services/mqttUser.service";
import { UserModel } from "../model/user.model";
import { GetSwitchByClientId } from "../services/switch.service";
import { ISwitchData } from "../interface/basicSwitch";
import { ResponseError } from "../utils/mapResponse";

export async function RegisterClient(req: Request, res: Response) {
  try {
    const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
    const regisFormdata: IRegisterDevice = req.body;
    const resData = await CreateDevice(decode.userId, regisFormdata);

    if ("error" in resData) {
      return ResponseError(res, "fail to create device", resData?.error);
    }

    return res.status(201).json({ message: "success", result: resData });
  } catch (error) {
    console.error("Error in RegisterClient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function ChangePasswordMqttUser(req: Request, res: Response) {
  try {
    const decode = decodeJWT(String(req.headers?.authorization).split(" ")[1]);
    const formData: IChangePasswordMqttUserReq = req.body;
    const mqtt_user: any = await FindMqttUserByUserId(decode.userId, formData.mqtt_username);
    const validate = await validatePassword(formData.old_password, mqtt_user.password);
    if (!validate) {
      return res.status(500).json({ error: "User or password invalid" });
    }
    const new_password = await encryptPassword(formData.new_password);
    const mockData: IChangePasswordMqttUserSrv = { mqtt_username: formData.mqtt_username, new_password: new_password };
    const result: any = await ChangePassword(mockData);
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    return res.status(200).json({ message: "success", result: result });
  } catch (error) {
    console.error("Error in ChangePasswordMqttUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const GetClientStatusByUser = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserModel;
    const resClientAll: any = await FindClientByUserId(user.id);
    if (resClientAll.error) {
      return res.status(500).json({ error: resClientAll.error });
    }
    const ClientAll = JSON.parse(JSON.stringify(resClientAll)).map((element: any) => {
      element.switchs = [];
      return element;
    });
    await Promise.all(
      ClientAll.map(async (val: any) => {
        const resSwitch: any = await GetSwitchByClientId(val.id);
        if (resSwitch == null) {
          throw new Error("Switch not found");
        }
        val.switchs = resSwitch;
      })
    );
    const resClientConn: any = await GetClientConnectByUser(user.username);
    if (resClientConn.error) {
      return res.status(500).json({ error: resClientConn.error });
    }
    const connected: string[] = resClientConn.data.data.map((val: any) => val.clientid);
    const result = ClientAll.map((val: any) => {
      const connected_status = connected.includes(val.client_id);
      const data: ISwitchData[] = val.switchs.map((sw: any) => ({
        client_id: val.client_id,
        switch_id: sw.id,
        status: sw.status,
        name: sw.name,
        mqtt_client_id: sw.mqtt_client_id,
      }));
      return { id: val.id, client_id: val.client_id, status_online: connected_status, data: data };
    });
    return res.status(200).json({ message: "success", result: result });
  } catch (error) {
    console.error("Error in GetClientStatusByUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
