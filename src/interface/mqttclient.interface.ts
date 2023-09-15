import Joi from "joi";

export interface IRegisterClient {
  client_id: string;
  type: string;
  status: string;
}

export const JRegisterClientSchema = Joi.object({
  client_id: Joi.string().required().min(1),
  type: Joi.string().required().min(1),
  status: Joi.string().required().min(1),
});
