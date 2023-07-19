import { Request, Response } from "express";

import { MqttClients } from "../model/mqtt_client.model";
import { IRegisterClient } from "../interface/mqttclient.interface";

export async function RegisterClient(req: Request, res: Response) {
  const userId: number = Number(req.headers.authorization);
  const body: IRegisterClient = req.body;
  const client = await MqttClients.create({ uid: userId, ...body });

  return res.status(201).json({ message: "success", result: client });
}
