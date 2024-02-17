import { DBError } from "../interface/errors";
import { IChangePasswordMqttUserReq, IChangePasswordMqttUserSrv } from "../interface/mqttUser.interface";
import { ICreateUserReq } from "../interface/user.interface";
import { MqttUser } from "../model/mqttUser.model";
import { MapDBError } from "../utils/mapValue";
import { MqttUserModel } from "../model/mqttUser.model";

export async function FindMqttUserByUserId(userId: string, mqtt_username: string): Promise<MqttUserModel | null | DBError> {
  try {
    const client = await MqttUser.findOne({ where: { uid: userId, username: mqtt_username } });
    return client;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function CreateMqttUser(userId: number, formdata: ICreateUserReq): Promise<MqttUserModel | null | DBError> {
  try {
    const response = await MqttUser.create({
      uid: userId,
      username: formdata.username,
      password: formdata.password,
      is_superuser: formdata.is_superuser,
    });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function ChangePassword(formdata: IChangePasswordMqttUserSrv): Promise<[affectedCount: number] | null | DBError> {
  try {
    const response = await MqttUser.update(
      { password: formdata.new_password },
      {
        where: {
          username: formdata.mqtt_username,
        },
      }
    );
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}
