import { axiosBaseQuery } from "@/_lib/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
// import { TauthResponse } from "../../data-types/authDataType";
import { baseApi } from "../../../baseApi";
import {
  Tresponse,
  TresponseFormat,
} from "../../../../data-types/responseDataType";
import { TsignUpData, TsignUpform } from "@/app/(auth)/(access)/sign-up/page";
import { Tuser, TuserResponse } from "../../../../data-types/userDataTypes";
import { TverifyUserData } from "@/app/(auth)/verify-user/page";
import { TSendOtpData } from "./dto/send.otp.dto";
// import { TSendOtpData } from "@/app/sh/layout";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      TresponseFormat<TuserResponse>,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        data,
      }),
    }),
    signUp: builder.mutation<TresponseFormat<TuserResponse>, TsignUpData>({
      query: (data) => ({
        url: "auth/sign-up",
        method: "POST",
        data,
      }),
    }),
    verifyUser: builder.mutation<
      TresponseFormat<TuserResponse>,
      TverifyUserData
    >({
      query: (data) => ({
        url: "auth/verify-user",
        method: "POST",
        data,
      }),
    }),
    sendOtp: builder.mutation<TresponseFormat<null>, TSendOtpData>({
      query: (data) => ({
        url: "auth/send-otp",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.query<TresponseFormat<null>, TverifyUserData>({
      query: () => ({
        url: "auth/send-otp",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useVerifyUserMutation,
  useSendOtpMutation,
} = authApi;
