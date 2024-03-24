import Joi from "joi";

export interface IRegisterDevice {
  client_id: string;
  switch_amount: number;
  type: string;
}

export const JRegisterClientSchema = Joi.object({
  client_id: Joi.string().required().min(1),
  switch_amount: Joi.number().required().min(1),
  type: Joi.string().required().min(1),
});

export interface IDeleteDevice {
  client_id: number;
}

export const JDeleteDeviceSchema = Joi.object({
  client_id: Joi.number().required().min(1),
});
