import { Request, Response, NextFunction } from "express";

function RequireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    return next();
  }
  return res.status(401).json({ status: "success", message: "UnAuthorized" });
}

export default RequireAuth;
