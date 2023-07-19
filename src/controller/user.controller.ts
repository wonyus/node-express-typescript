import { Request, Response } from "express";
import { User } from "../model/user.model";
import { FindOneClientByUserId } from "../services/user.service";

export async function Signup(req: Request, res: Response) {
  const user = await User.create({ name: "wonyus", username: "wonyus", password: "wonyus" });
  return res.status(201).json({ message: "success", result: user });
}

export async function FindClientByUserId(req: Request, res: Response) {
  const userId: string = req.headers?.authorization || "";
  const ClientId = req.body.clientId;

  const client = await FindOneClientByUserId(userId, ClientId);
  if (client == null) {
    return res.status(404).json({ message: "not found", result: client });
  }
  return res.status(200).json({ message: "success", result: client });
}
