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
  console.log(error);
  return ErrorAPICase(error);
};

const ErrorDBCase = (error: any): DBError => {
  switch (error.code) {
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
  console.log(Object.keys(error));
  console.log(1, error.message);
  console.log(2, error.name);
  console.log(3, error.code);
  console.log(4, error.errors);
  console.log(5, error.parent);
  console.log(Object.keys(error.errors))
  console.log(6, error.errors[0].validatorKey);

  return ErrorDBCase(error);
};
