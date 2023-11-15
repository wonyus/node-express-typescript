import Joi from "joi";

export interface ICreateUserReq {
  name: string;
  username: string;
  password: string;
  is_superuser: boolean
}

export const JCreateUserReqSchema = Joi.object<ICreateUserReq>({
  name: Joi.string().required().min(1),
  username: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
  is_superuser: Joi.boolean().default(false)
});

export interface ISignInUserReq {
  username: string;
  password: string;
}
export const JSignInUserReqSchema = Joi.object<ISignInUserReq>({
  username: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});

export interface IChangePasswordUserReq {
  old_password: string;
  new_password: string;
}

export const JChangePasswordUserReqSchema = Joi.object<IChangePasswordUserReq>({
  old_password: Joi.string().required().min(1),
  new_password: Joi.string().required().min(1),
});

export interface IChangePasswordUserSrv {
  uid: string;
  new_password: string;
}