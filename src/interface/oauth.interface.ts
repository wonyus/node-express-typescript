import Joi from "joi";

export interface ISignInUserOAuthReq {
  o_id: number;
  name: string;
  username: string;
  signin_type: string;
  provider: string;
  profile_url: string;
  is_superuser: boolean;
}
export const JSignInUserOAuthReqSchema = Joi.object<ISignInUserOAuthReq>({
  o_id: Joi.number().required().min(1),
  name: Joi.string().required().min(1),
  username: Joi.string().required().min(1),
  signin_type: Joi.string().required().min(1),
  provider: Joi.string().required().min(1),
  profile_url: Joi.string().required().min(1),
  is_superuser: Joi.boolean().default(false),
});

export interface ICreateUserOAuthReq {
  o_id: number;
  name: string;
  username: string;
  signin_type: string;
  provider: string;
  profile_url: string;
  is_superuser: boolean;
}

export const JCreateUserReqSchema = Joi.object<ICreateUserOAuthReq>({
  o_id: Joi.number().required().min(1),
  name: Joi.string().required().min(1),
  username: Joi.string().required().min(1),
  signin_type: Joi.string().required().min(1),
  provider: Joi.string().required().min(1),
  profile_url: Joi.string().required().min(1),
  is_superuser: Joi.boolean().default(false),
});
