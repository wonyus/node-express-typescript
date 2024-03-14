type TSwitchAction = "on" | "off";

export type TSchedulerInitialValues = {
  days: [number, boolean][];
  dates: [number, boolean][];
  months: [number, boolean][];
  times: [string, string][];
};

export interface ISwitchAction {
  action: TSwitchAction;
  client_id: string;
}

export interface ISwitchData {
  client_id: string;
  switch_id: number;
  status: boolean;
  uuid: string;
  name: string;
  mqtt_client_id: string;
  scheduler_active: boolean;
  scheduler: TSchedulerInitialValues;
}

export interface IRegisterSwitch {
  client_id: number;
  mqtt_client_id: string;
  status: boolean;
  name: string;
  scheduler_active: boolean;
  scheduler: TSchedulerInitialValues;
}
