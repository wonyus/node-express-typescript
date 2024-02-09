import { Response } from "express";

export const ResponseError = (res: Response<any, Record<string, any>>, error: any) => {
  // if (error instanceof MapDBError) {
  //   return res.status(error.status).json({ message: error.message, result: error.result });
  // } else {
  //   return res.status(500).json({ message: error.message, result: error.result });
  // }
};

export const ResponseErrorWithCode = (res: Response<any, Record<string, any>>, code: number, msg: string, err_msg: string) => {
    res.status(code).json({ message: msg, result: err_msg });
};
