import Joi from "joi";
import { ISwitchData } from "./basicSwitch";

export interface ISwitchDevice {
  id: number;
  client_id: string;
  name: string;
  status_online: boolean;
  data: ISwitchData[];
}

export const JSwitchDeviceSchema = Joi.object({
  id: Joi.number().required().min(1),
  client_id: Joi.string().required().min(1),
  name: Joi.string().required().min(1),
  status_online: Joi.boolean().required(),
  data: Joi.array()
    .items(
      Joi.object({
        mqtt_client_id: Joi.string().required().min(1),
        client_id: Joi.string().required().min(1),
        uuid: Joi.string().required().min(36),
        switch_id: Joi.number().required().min(1),
        name: Joi.string().required().min(1),
        status: Joi.boolean().required(),
        scheduler_active: Joi.boolean().required(),
        scheduler: Joi.object({
          days: Joi.array().items(Joi.array().items(Joi.number(), Joi.boolean())).required(),
          dates: Joi.array().items(Joi.array().items(Joi.number(), Joi.boolean())).required(),
          months: Joi.array().items(Joi.array().items(Joi.number(), Joi.boolean())).required(),
          times: Joi.array().items(Joi.array().items(Joi.string(), Joi.string())).required(),
        }),
      })
        .required()
        .min(1)
    )
    .required()
    .min(1),
});
