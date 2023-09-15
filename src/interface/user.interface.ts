import Joi from "joi";

export interface ICreateClientReq {
  user_id: string;
  password: string;
}
export const JCreateClientReqSchema = Joi.object<ICreateClientReq>({
  user_id: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});

export interface ICreateClientRes {
  is_superuser?: boolean;
  user_id: string;
}
export const JCreateClientResSchema = Joi.object<ICreateClientRes>({
  is_superuser: Joi.boolean().optional().default(false),
  user_id: Joi.string().required().min(1),
});

export interface ICreateUserReq {
  name: string;
  username: string;
  password: string;
}
export const JCreateUserReqSchema = Joi.object<ICreateUserReq>({
  name: Joi.string().required().min(1),
  username: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});

export interface ISignInUserReq {
  username: string;
  password: string;
}
export const JSignInUserReqSchema = Joi.object<ISignInUserReq>({
  username: Joi.string().required().min(1),
  password: Joi.string().required().min(1),
});
