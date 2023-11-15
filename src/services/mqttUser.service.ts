import { IChangePasswordMqttUserReq, IChangePasswordMqttUserSrv } from "../interface/mqttUser.interface";
import { ICreateUserReq } from "../interface/user.interface";
import { MqttUser } from "../model/mqttUser.model";

export async function FindMqttUserByUserId(userId: string, mqtt_username: string) {
  const client = await MqttUser.findOne({ where: { uid: userId, username: mqtt_username } });
  return client;
}

export async function CreateMqttUser(userId: number, formdata: ICreateUserReq): Promise<any> {
  try {
    const response = await MqttUser.create({
      uid: userId,
      username: formdata.username,
      password: formdata.password,
      is_superuser: formdata.is_superuser,
    });
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}

export async function ChangePassword(formdata: IChangePasswordMqttUserSrv) {
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
    console.log(error);
    
    return { error: error.parent.detail };
  }
}
