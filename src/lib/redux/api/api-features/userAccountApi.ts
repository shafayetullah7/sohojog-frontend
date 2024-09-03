import { TresponseFormat } from "../../data-types/responseDataType";
import { Tuser, TuserResponse } from "../../data-types/userDataTypes";
import { baseApi } from "../baseApi";

export const userAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<TresponseFormat<TuserResponse>, void>({
      query: () => ({
        url: "user/get-me",
      }),
    }),
  }),
});

export const { useGetMeQuery } = userAccountApi;
