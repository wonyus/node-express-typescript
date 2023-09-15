import { Response } from "express";
import API from "../configs/axios";
import { MqttClients } from "../model/mqtt_client.model";
import { User } from "../model/user.model";
import { ICreateUserReq, ICreateClientReq, ICreateClientRes } from "../interface/user.interface";
import { IPublishReq, IPublishRes } from "../interface/publish.interface";

type ICreateUserRes = { is_superuser: boolean; user_id: string };

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

export async function SignInUser(username: string) {
  try {
    const response = await User.findOne({
      attributes: ["id", "name", "username", "password"],
      where: { username: username },
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
