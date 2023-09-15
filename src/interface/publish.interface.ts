import Joi from "joi";

type payloadEncode = "plain";

export interface IPublishReq {
  payload_encoding?: payloadEncode;
  topic: string;
  qos: number;
  payload: string;
  retain: boolean;
}
export const JPublishReqSchema = Joi.object<IPublishReq>({
  payload_encoding: Joi.string().required().min(1).default("plain"),
  topic: Joi.string().required().min(1),
  qos: Joi.number().required().min(0),
  payload: Joi.string().required().min(1),
  retain: Joi.boolean().required(),
});

export const JPublishBulkReqSchema = Joi.array().items(
  Joi.object<IPublishReq>({
    payload_encoding: Joi.string().required().min(1).default("plain"),
    topic: Joi.string().required().min(1),
    qos: Joi.number().required().min(0),
    payload: Joi.string().required().min(1),
    retain: Joi.boolean().required(),
  })
);

export interface IPublishRes {
  id: string;
}
export const JPublishResSchema = Joi.object<IPublishRes>({
  id: Joi.string().required().min(1),
});
