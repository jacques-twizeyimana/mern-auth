import axios, { AxiosRequestConfig } from "axios";
import { LoginRes } from "../types/services/auth.types";

const commonConfig: AxiosRequestConfig = {};
const BASE_URL = "http://localhost:5000/api/v1/";

const interceptAdminReq = (config: AxiosRequestConfig) => {
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
  baseURL: BASE_URL,
};

export const customAxios = axios.create(axiosConfig);
