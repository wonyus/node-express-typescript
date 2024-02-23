import { logger } from "../../index";
import { ApiError, DBError } from "../interface/errors";

const ErrorAPICase = (error: any): ApiError => {
  switch (error.code) {
    case "ECONNREFUSED":
      return {
        error: {
          message: "Connection Refused",
          name: error.name,
          code: error.code,
        },
      };
    case "ECONNRESET":
      return {
        error: {
          message: "Connection Reset",
          name: error.name,
          code: error.code,
        },
      };
    case "ECONNABORTED":
      return {
        error: {
          message: "Connection Aborted",
          name: error.name,
          code: error.code,
        },
      };
    case "ENOTFOUND":
      return {
        error: {
          message: "Host Not Found",
          name: error.name,
          code: error.code,
        },
      };
    default:
      return {
        error: {
          message: error.message,
          name: error.name,
          code: error.code,
        },
      };
  }
};

export const MapAPIError = (error: any): ApiError => {
  return ErrorAPICase(error);
};

const ErrorDBCase = (error: any): DBError => {
  switch (error.message.toUpperCase()) {
    case "ER_DUP_ENTRY":
      return {
        error: {
          message: "Duplicate Entry",
          name: error.name,
          code: error.code,
        },
      };
    case "ER_NO_REFERENCED_ROW_2":
      return {
        error: {
          message: "Foreign Key Error",
          name: error.name,
          code: error.code,
        },
      };
    case "ETIMEDOUT":
      return {
        error: {
          message: "Connection Timed Out",
          name: error.name,
          code: error.code,
        },
      };
    case "OPERATION TIMEOUT":
      return {
        error: {
          message: error.message,
          name: error.name,
          code: error.code,
        },
      };

    default:
      return {
        error: {
          message: error.message,
          name: error.name,
          code: error.code,
        },
      };
  }
};

export const MapDBError = (error: any): DBError => {
  logger.info(`${1}, ${error.message}`);
  logger.info(`${2}, ${error.name}`);
  logger.info(`${3}, ${error.code}`);
  logger.info(`${4}, ${error.errors}`);
  logger.info(`${5}, ${error.parent}`);
  return ErrorDBCase(error);
};
