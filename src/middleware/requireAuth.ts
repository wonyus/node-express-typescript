import { Request, Response, NextFunction } from "express";
import { decodeJWT, validateJWT } from "../utils/JWT";

export default function RequireAuth(req: Request, res: Response, next: NextFunction) {
  const token: string = String(req.headers.authorization).split(" ")[1];
  const decode = decodeJWT(token);
  const validate = validateJWT(token, decode);
  if (validate == null) {
    return res.status(401).json({ status: "success", message: "UnAuthorized" });
  }
  return next();
}