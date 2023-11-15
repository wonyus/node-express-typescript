import Joi from "joi";

export interface IChangePasswordMqttUserReq {
  mqtt_username: string;
  old_password: string;
  new_password: string;
}

export const JChangePasswordMqttUserReqSchema = Joi.object<IChangePasswordMqttUserReq>({
  mqtt_username: Joi.string().required().min(1),
  old_password: Joi.string().required().min(1),
  new_password: Joi.string().required().min(1),
});

export interface IChangePasswordMqttUserSrv {
  mqtt_username: string;
  new_password: string;
}
