import axios from "axios";
import { api_url, api_key, api_secret } from "./constant";

const API = axios.create({
  baseURL: api_url,
  timeout: 1000,
  auth: {
    username: api_key,
    password: api_secret,
  },
  headers: { "content-type": "application/json" },
});

export default API;
