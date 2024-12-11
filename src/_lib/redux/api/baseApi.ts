import { axiosBaseQuery } from "@/_lib/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = `http://localhost:4000/api/v1/`;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl }),
  endpoints: () => ({}),
  tagTypes: [
    "manager-project",
    "manager-participation",
    "participant-invitation",
    "manager-team",
    "team-membership",
  ],
  keepUnusedDataFor: 45,
  refetchOnReconnect: true,
});
