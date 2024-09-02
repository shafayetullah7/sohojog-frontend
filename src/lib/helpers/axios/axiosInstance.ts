import {
  Tresponse,
  TresponseFormat,
} from "@/lib/redux/data-types/responseDataType";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
    console.log("level 2 ok");
    console.log("axios response 1", response.data);
    console.log("axios response 1 type", typeof response);

    const data: TresponseFormat<any> = response.data;

    if (data?.access?.token) {
      console.log("token", data.access.token);
      localStorage.setItem("sohojog-token", data.access.token);
    }
    if (data?.access?.otpToken) {
      localStorage.setItem("sohojog-otptoken", data.access.otpToken);
    }

    return response;
    // return response;
  },
  (error: AxiosError) => {
    console.log("level 2 error");
    if (error.response) {
      console.error("Error response:", error.response);
    } else if (error.request) {
      console.error("No response:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
