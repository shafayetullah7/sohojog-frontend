import {
  TerrorResponse,
  Tresponse,
  TresponseFormat,
} from "@/_lib/redux/data-types/responseDataType";
import axios, { AxiosError } from "axios";
import Router from "next/router";
import { LocalStorageService } from "../access/Access";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

const localStorageService = LocalStorageService.getInstance();

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const token = localStorageService.token;
    const otpToken = localStorageService.otpToken;

    console.log("axios interceptor token", window.location.href, token);

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else if (otpToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${otpToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    // console.log("level 2 ok");
    // console.log("axios response 1", response.data);
    // console.log("axios response 1 type", typeof response);

    const data: TresponseFormat<any> = response.data;

    if (data?.access?.token) {
      // console.log("token", data.access.token);
      // localStorage.setItem("sohojogtoken", data.access.token);
      localStorageService.token = data.access.token;
    } else if (data?.access?.otpToken) {
      // localStorage.setItem("sohojogotptoken", data.access.otpToken);
      localStorageService.token = data.access.otpToken;
    }

    return response;
    // return response;
  },
  (error: AxiosError<TerrorResponse>) => {
    console.log("level 2 error");
    if (error.response) {
      console.error("Error response:", error.response);
    } else if (error.request) {
      console.error("No response:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    if (error.status === 401 || error.response?.data.access.sessionExpired) {
      console.log('here sign in');
      Router.push("/sign-in");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
