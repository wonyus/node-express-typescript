import { ISwitchAction } from "../interface/basicSwitch";
import { Tswitch } from "../interface/topic";
import { MqttClients } from "../model/mqtt_client.model";
import Publish from "../services/publish";
import { Request, Response } from "express";

export async function SubScribeSwitchAction(message: ISwitchAction) {
  const data: ISwitchAction = message;
  // find user

  // check clientId from user

  // publish
  // Publish(Tswitch, data, (err) => {
  //   console.log(err);
  // });
}

export async function AppSwitchAction(req: Request, res: Response) {
  // get data from body
  const body: ISwitchAction = req.body;

  //update switch status
  const result = await MqttClients.update({ status: body.action }, { where: { client_id: body.client_id } });

  //check update
  if (result[0] == 0) {
    return res.status(404).json({ status: "fail", error_message: `not found` });
  }

  //publish to mqtt broker
  Publish(Tswitch, body, (err) => {
    console.log("13212");

    if (err) {
      return res.status(500).json({ status: "fail", error_message: `${err}` });
    }
    return res.status(200).json({ status: "success" });
  });
}
