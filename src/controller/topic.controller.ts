import { Tconnect, Tswitch, Ttest, Ttype } from "../interface/topic";
import { BufferToObject } from "../utils/convert_mqtt";
import { SubScribeSwitchAction } from "./switch.controller";

export function SubScibeSwitch(topic: Ttype, message: Buffer) {
  switch (topic) {
    case Tconnect:
      console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
      break;
    case Ttest:
      console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
      break;
    case Tswitch:
      SubScribeSwitchAction(BufferToObject(message));
      break;
    default:
      console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
      break;
  }
}
