import axios, { AxiosRequestConfig } from "axios";
import { LoginRes } from "../types/services/auth.types";

const commonConfig: AxiosRequestConfig = {};
// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = "https://mern-auth-test-backend.herokuapp.com"

const interceptRequest = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");

  // when request is open no need to add bearer token
  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    // @ts-ignore
    config.headers["Authorization"] = jwtInfo.token;
  }

  return config;
};

const axiosConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: BASE_URL + "/api/v1/",
};

const customAxios = axios.create(axiosConfig);
customAxios.interceptors.request.use(interceptRequest);

export { customAxios };
