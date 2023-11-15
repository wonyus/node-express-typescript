import { Response } from "express";
import API from "../configs/axios";
import { MqttClient } from "../model/mqttClient.model";
import { User } from "../model/user.model";
import { IChangePasswordUserSrv, ICreateUserReq } from "../interface/user.interface";
import { IPublishReq, IPublishRes } from "../interface/publish.interface";

export async function FindOneClientByUserId(userId: string, clientId: string) {
  const client = await MqttClient.findOne({ where: { uid: userId, client_id: clientId } });
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

export async function GetUserById(id: string) {
  const response = await User.findOne({ where: { username: id } });
  return response;
}

export async function FindOneUser(username: string) {
  const response = await User.findOne({ attributes: ["id", "name", "username"], where: { username: username } });
  return response;
}

export async function ChangePassword(formdata: IChangePasswordUserSrv): Promise<any> {
  try {
    const response = await User.update(
      { password: formdata.new_password },
      {
        where: {
          id: formdata.uid,
        },
      }
    );
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
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
