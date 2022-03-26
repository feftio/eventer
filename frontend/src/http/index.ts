import axios from "axios";
import { API_URL } from "./settings";

export const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});
