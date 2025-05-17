import axios from "axios";
import { LocalStorageKeys } from "../enums/local-storage-keys.enum";
import { extractErrorMessage } from "./extract-error-message";

export const Api = axios.create({
  baseURL: "http://localhost:3000/api",
});

Api.interceptors.request.use(function (config) {
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

Api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    error.message = extractErrorMessage(error);
    return Promise.reject(error);
  }
);
