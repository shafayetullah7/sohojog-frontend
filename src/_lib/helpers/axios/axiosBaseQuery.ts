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
      // Conditionally set the Content-Type for FormData
      const requestHeaders: AxiosRequestConfig["headers"] = {
        ...headers, // Spread any headers passed in
      };

      // Only set Content-Type if data is NOT FormData (to allow auto boundary generation)
      if (!(data instanceof FormData)) {
        requestHeaders["Content-Type"] = contentType || "application/json";
      }

      // Perform the API request
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: requestHeaders,
      });

      return { data: result.data };
    } catch (axiosError) {
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
