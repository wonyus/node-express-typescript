import { NextFunction, Request, Response } from "express";
import passport from "passport";

export default function passportHandler(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).send({ message: "Unauthorized", status: 401 });
    }
    req.user = user;
    return next();
  })(req, res, next);
}
