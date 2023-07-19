import { MqttClients } from "../model/mqtt_client.model";

export async function FindOneClientByUserId(userId: string, clientId: string) {
  const client = await MqttClients.findOne({ where: { uid: userId, client_id: clientId } });
  return client;
}
