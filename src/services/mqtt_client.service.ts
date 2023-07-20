import API from "../configs/axios";
import { IRegisterClient } from "../interface/mqttclient.interface";
import { MqttClients } from "../model/mqtt_client.model";

export async function CreateDevice(userId: number, formData: IRegisterClient): Promise<any> {
  try {
    const response = await MqttClients.create({ uid: userId, ...formData });
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}

export async function GetClientConnectByUser(username: string) {
  try {
    const response = await API.get(`/clients?username=${username}`);
    return response;
  } catch (error: any) {
    return { data: { data: error.response.data, code: error.code } };
  }
}

export async function FindClientByUserId(userId: number) {
  try {
    const client = await MqttClients.findAll({ where: { uid: userId } });
    return client;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}
