import axios from "axios";
import { API_BASE_URL } from "./Url";

let instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {},
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization-TOKEN"] =
      localStorage.getItem("access_token");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
