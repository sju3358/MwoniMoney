import axios from "axios";
import { API_BASE_URL } from "./Url";

let instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    console.log("인터셉터");
    config.headers.Authorization = localStorage.getItem("access_token");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
