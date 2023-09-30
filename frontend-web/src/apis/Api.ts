import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "./Url";
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
