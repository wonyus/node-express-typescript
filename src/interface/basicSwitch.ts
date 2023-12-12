type TSwitchAction = "on" | "off";

export interface ISwitchAction {
  action: TSwitchAction;
  client_id: string;
}

export interface ISwitchData {
  mqtt_client_id: string;
  client_id: string;
  switch_id: string;
  name: string;
  status: boolean;
}

export interface IRegisterSwitch {
  client_id: number;
  mqtt_client_id: string;
  status: boolean;
}
