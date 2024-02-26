import { IRegisterSwitch } from "../interface/basicSwitch";
import { DBError } from "../interface/errors";
import { Switch, SwitchModel } from "../model/switch.model";
import { MapDBError } from "../utils/mapValue";

export async function CreateSwitch(formData: IRegisterSwitch[]): Promise<SwitchModel[] | null | DBError> {
  try {
    const response = await Switch.bulkCreate(formData);
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function GetSwitchByClientId(client_id: string): Promise<SwitchModel[] | null | DBError> {
  try {
    const response = await Switch.findAll({ where: { client_id: client_id } });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function FindOneSwitch(id: string): Promise<SwitchModel | DBError> {
  try {
    const response = await Switch.findOne({ where: { id: id } });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function UpdateSwitch(id: string, formData: any): Promise<[affectedCount: number] | DBError> {
  try {
    const response = await Switch.update({ ...formData }, { where: { id: id } });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function UpdateSwitches(updates: Array<{ id: string; formData: any }>): Promise<number | DBError> {
  try {
    const updatePromises = updates.map(async ({ id, formData }) => {
      const response = await Switch.update({ ...formData }, { where: { id: id } });
      return response[0];
    });

    const results = await Promise.all(updatePromises);
    const totalAffectedCount = results.reduce((acc, affectedCount) => acc + affectedCount, 0);
    return totalAffectedCount;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}
