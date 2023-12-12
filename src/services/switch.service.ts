import { IRegisterSwitch } from "../interface/basicSwitch";
import { Switch } from "../model/switch.model";

export async function CreateSwitch(formData: IRegisterSwitch[]): Promise<any> {
  try {
    const response = await Switch.bulkCreate(formData);
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}

export async function GetSwitchByClientId(client_id: string) {
  const response = await Switch.findAll({ where: { client_id: client_id } });
  return response;
}

export async function FindOneSwitch(id: string) {
  const response = await Switch.findOne({ where: { id: id } });
  return response;
}

export async function UpdateSwitch(id: string, formData: any) {
  const response = await Switch.update({ ...formData }, { where: { id: id } });
  return response;
}
