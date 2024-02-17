import { Response } from "express";
import { MapDBError } from "./mapValue";

export const ResponseError = (res: Response<any, Record<string, any>>, err_msg: string, error: any) => {
  res.status(500).json({ message: "fail", error_message: err_msg, error: error });
};

export const ResponseErrorWithCode = (res: Response<any, Record<string, any>>, code: number, msg: string, err_msg: string) => {
  res.status(code).json({ message: msg, result: err_msg });
};

export const ResponseSuccess = (res: Response<any, Record<string, any>>, result: any) => {
  res.status(200).json({ message: "success", result: result });
};

export const ResponseSuccessWithCode = (res: Response<any, Record<string, any>>, code: number, msg: string, result: any) => {
  res.status(code).json({ message: msg, result: result });
};
