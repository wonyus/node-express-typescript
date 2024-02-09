import API from "../configs/axios";
import { ApiError, DBError } from "../interface/errors";
import { IRegisterDevice } from "../interface/mqttClient.interface";
import { MqttClient } from "../model/mqttClient.model";
import { MapAPIError, MapDBError } from "../utils/mapValue";

export async function CreateDevice(userId: number, formData: IRegisterDevice): Promise<any> {
  try {
    const response = await MqttClient.create({ uid: userId, ...formData });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function GetClientConnectByUser(username: string) {
  try {
    const response = await API.get(`/clients?username=${username}`);
    return response;
  } catch (error: any) {
    const newError: ApiError = MapAPIError(error);
    return newError;
  }
}

export async function FindClientByUserId(userId: number) {
  try {
    const client = await MqttClient.findAll({ where: { uid: userId } });
    return client;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}
