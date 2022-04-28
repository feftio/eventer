import axios from "axios";
import { API_URL } from "./settings";

export const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token !== null && config.headers !== undefined) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
});
