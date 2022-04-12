import axios, { AxiosRequestConfig } from "axios";

const commonConfig: AxiosRequestConfig = {};
const BASE_URL = "http://localhost:5000/api/v1/";

const axiosConfig: AxiosRequestConfig = {
  ...commonConfig,
  baseURL: BASE_URL,
};

export const customAxios = axios.create(axiosConfig);
