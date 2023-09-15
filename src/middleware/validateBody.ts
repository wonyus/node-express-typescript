import { Request, Response } from "express";
import Joi from "joi";

export default function validateBody(schema: Joi.ObjectSchema<any> | Joi.ArraySchema<any[]>) {
  return function (req: Request, res: Response, next: () => void) {
    const { error, value } = schema.validate(req.body);
    console.log(value);

    if (!error) {
      return next();
    }
    return res.status(400).json({ error: error.details[0].message });
  };
}
