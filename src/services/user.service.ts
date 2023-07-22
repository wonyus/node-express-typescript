import { Response } from "express";
import API from "../configs/axios";
import { MqttClients } from "../model/mqtt_client.model";
import { User } from "../model/user.model";

export interface ICreateClientReq {
  user_id: string;
  password: string;
}
export interface ICreateClientRes {
  is_superuser?: boolean;
  user_id: string;
}
export interface ICreateUserReq {
  name: string;
  username: string;
  password: string;
}

export interface ISignInUserReq {
  username: string;
}

type ICreateUserRes = { is_superuser: boolean; user_id: string };

type payloadEncode = "plain";

export interface IPublishReq {
  payload_encoding?: payloadEncode;
  topic: string;
  qos: number;
  payload: string;
  retain: boolean;
  // properties?: {
  //   payload_format_indicator: number;
  //   message_expiry_interval: number;
  //   response_topic: string;
  //   correlation_data: string;
  //   user_properties: {
  //     application: string;
  //   };
  //   content_type: string;
  // };
}

export interface IPublishRes {
  id: string;
}

export async function FindOneClientByUserId(userId: string, clientId: string) {
  const client = await MqttClients.findOne({ where: { uid: userId, client_id: clientId } });
  return client;
}

export async function CreateUser(formdata: ICreateUserReq) {
  try {
    const response = await User.create({
      name: formdata.name,
      username: formdata.username,
      password: formdata.password,
    });
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}

export async function SignInUser(formData: ISignInUserReq) {
  try {
    const response = await User.findOne({
      attributes: ["id", "name", "username", "password"],
      where: { username: formData.username },
    });
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}

export async function FindOneUser(username: string) {
  const response = await User.findOne({ attributes: ["id", "name", "username"], where: { username: username } });
  return response;
}

export async function CreateClient(formData: ICreateClientReq) {
  try {
    const response = await API.post<ICreateClientRes>(
      "/authentication/password_based:built_in_database/users",
      formData
    );
    return response;
  } catch (error: any) {
    return { data: { data: error.response.data, code: error.code } };
  }
}

export async function Publish(formData: IPublishReq) {
  try {
    const response = await API.post<IPublishRes>("/publish", formData);
    return response;
  } catch (error: any) {
    return { data: { data: error.response.data, code: error.code } };
  }
}

export async function PublishBulk(formData: IPublishReq[]) {
  try {
    const response = await API.post<IPublishRes[]>("/publish/bulk", formData);
    return response;
  } catch (error: any) {
    return { data: { data: error.response.data, code: error.code } };
  }
}
