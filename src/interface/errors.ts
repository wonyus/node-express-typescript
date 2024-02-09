export interface ApiError {
  error: {
    message: string;
    name: string;
    code: string;
  };
}

export interface DBError {
  error: {
    message: string;
    name: string;
    code: string;
  };
}
