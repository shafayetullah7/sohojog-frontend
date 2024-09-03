import { axiosBaseQuery } from "@/lib/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
// import { TauthResponse } from "../../data-types/authDataType";
import { baseApi } from "../baseApi";
import { Tresponse, TresponseFormat } from "../../data-types/responseDataType";
import { TsignUpData, TsignUpform } from "@/app/(auth)/sign-up/page";
import { Tuser } from "../../data-types/userDataTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TresponseFormat<Tuser>,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        data,
      }),
    }),
    signUp: builder.mutation<TresponseFormat<Tuser>, TsignUpData>({
      query: (data) => ({
        url: "auth/sign-up",
        method: "POST",
        data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignUpMutation } = authApi;