import { Request, Response } from "express";
import { GetSwitchByClientId } from "../services/switch.service";
import { ResponseSuccess } from "../utils/mapResponse";
import { FindClientByUserId, GetClientConnectByUser } from "../services/mqttClient.service";
import { UserModel } from "../model/user.model";

export async function GetDashboard(req: Request, res: Response) {
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

    const online = { data: [], count: 0 };
    const offline = { data: [], count: 0 };
    const active = { data: [], count: 0 };
    const inactive = { data: [], count: 0 };

    ClientAll.forEach((val: any) => {
      const connected_status = connected.includes(val.client_id);
      if (connected_status) {
        online.data.push(...val.switchs);
        online.count = online.count + val.switchs.length;
        val.switchs.forEach((sw: any) => {
          sw.switchs.forEach((sws: any) => {
            if (sws.status) {
              active.data.push(val);
              active.count++;
            } else {
              inactive.data.push(val);
              inactive.count++;
            }
          });
        });
      } else {
        offline.data.push(...val.switchs);
        offline.count = offline.count + val.switchs.length;
        inactive.data.push(...val.switchs);
        inactive.count = inactive.count + val.switchs.length;
      }
    });

    return ResponseSuccess(res, { online, offline, active, inactive });
  } catch (error) {
    console.error("Error in GetDashboard:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
