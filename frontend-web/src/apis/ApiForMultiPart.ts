import axios from "axios";
import { API_BASE_URL } from "./Url";

let instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(response);
    const newAccessToken = response.headers["x-access-token"];
    if (
      newAccessToken != null &&
      newAccessToken != undefined &&
      newAccessToken != ""
    )
      localStorage.setItem("token", newAccessToken);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
