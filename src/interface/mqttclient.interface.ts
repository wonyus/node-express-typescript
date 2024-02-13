import Joi from "joi";

declare global {
  export interface IRegisterDevice {
    client_id: string;
    switch_amount: number;
    type: string;
  }
}

export const JRegisterClientSchema = Joi.object({
  client_id: Joi.string().required().min(1),
  switch_amount: Joi.number().required().min(1),
  type: Joi.string().required().min(1),
});

export default IRegisterDevice;
