import { AxiosResponse } from "axios";
import API from "../configs/axios";
import { ApiError, DBError } from "../interface/errors";
import { MqttClient, MqttClientModel } from "../model/mqttClient.model";
import { MapAPIError, MapDBError } from "../utils/mapValue";
import { IRegisterDevice } from "../interface/mqttDevice.interface";

export async function CreateDevice(userId: number, formData: IRegisterDevice): Promise<DBError | MqttClientModel> {
  try {
    const response = await MqttClient.create({ uid: userId, ...formData });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function GetClientConnectByUser(username: string): Promise<ApiError | AxiosResponse<any, any>> {
  try {
    const response = await API.get(`/clients?username=${username}`);
    return response;
  } catch (error: any) {
    const newError: ApiError = MapAPIError(error);
    return newError;
  }
}

export async function FindClientByUserId(userId: number): Promise<DBError | MqttClientModel[]> {
  try {
    const client = await MqttClient.findAll({ where: { uid: userId } });
    return client;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function UpdateClientByClientId(clientId: number, formData: any): Promise<DBError | [affectedCount: number]> {
  try {
    const response = await MqttClient.update({ ...formData }, { where: { id: clientId } });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}
