import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationError } from "joi";

// Add a custom property 'validatedData' to the 'Request' type definition
declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
    }
  }
}

const validateBody = (schema: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error, value } = schema.validate(req.body);

    if (!error) {
      // If there is no validation error, attach the validated data to the request object
      req.validatedData = value;
      return next();
    }

    // If there is a validation error, send a 400 Bad Request response with the error details
    return res.status(400).json({ error: (error as ValidationError).details[0].message });
  };
};

export default validateBody;
