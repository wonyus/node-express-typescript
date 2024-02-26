import { Request, Response } from "express";
import { UpdateSwitches } from "../services/switch.service";
import { ISwitchDevice } from "../interface/device.interface";
import { ResponseSuccess } from "../utils/mapResponse";
import { UpdateClientByClientId } from "../services/mqttClient.service";

export async function UpdateSwitchDevice(req: Request, res: Response) {
  const reqData = req.body as ISwitchDevice;

  const switches = [];
  for (const switchData of reqData.data) {
    switches.push({ id: switchData.switch_id, formData: { name: switchData.name } });
  }

  const switchesUpdated = await UpdateSwitches(switches);

  const nameUpdated = await UpdateClientByClientId(reqData.id, { name: reqData.name });

  return ResponseSuccess(res, { switchesUpdated, nameUpdated });
}
