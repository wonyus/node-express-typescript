type TSwitchAction = "on" | "off";

export interface ISwitchAction {
  action: TSwitchAction;
  client_id: string;
}
