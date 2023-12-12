import { Request, Response } from "express";
import { UpdateSwitch } from "../services/switch.service";

export async function UpdateStatus(req: Request, res: Response) {
  const reqData = req.body;
  reqData.data.payload.switchs.forEach(async (val: any) => {
    await UpdateSwitch(val.id, { status: val.status }); 
  });

  return res.status(200).json({ message: "success", result: { user: "userRes" } });
}
