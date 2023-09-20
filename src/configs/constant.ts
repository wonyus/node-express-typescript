import { config } from "dotenv";
config();

const server_port: number = Number(process.env.SERVER_PORT) || 3000;
const api_url: string = String(process.env.API_URL) || "http://localhost:3000";
const api_key: string = String(process.env.API_KEY) || "http://localhost:3000";
const api_secret: string = String(process.env.API_SECRET) || "http://localhost:3000";
const expDate: string = String(process.env.JWT_EXP_DATE) || "1d";
const secretKey: string = String(process.env.JWT_SECRECT) || "yourSecretKeyHere";
const appName: string = String(process.env.APP_NAME) || "yourSecretKeyHere";

export {
  server_port,
  api_url,
  api_key,
  api_secret,
  expDate,
  secretKey,
  appName,
};
