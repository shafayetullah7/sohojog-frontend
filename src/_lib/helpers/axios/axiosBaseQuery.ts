import { createApi } from "@reduxjs/toolkit/query";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";
import {
  TerrorResponse,
  Tmeta,
  TresponseFormat,
} from "../../redux/data-types/responseDataType";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          "Content-Type": contentType || "application/json",
        },
      });
      // console.log("level 1");
      // console.log("level 1 res", result);
      return { data: result.data };
    } catch (axiosError) {
      // const err = axiosError as AxiosError<TerrorResponse>;
      const err = axiosError as AxiosError;

      console.error("API Error:", err.response?.data);

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || {
            success: false,
            message: err.message || "Something went wrong",
            data: null,
            errors: [{ name: "UNKNOWN_ERROR", message: err.message }],
            meta: {} as Tmeta,
          },
        },
      };
    }
  };
