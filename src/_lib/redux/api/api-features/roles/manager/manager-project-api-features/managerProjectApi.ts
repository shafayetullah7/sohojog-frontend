import {
  TerrorResponse,
  TresponseFormat,
} from "@/_lib/redux/data-types/responseDataType";
import { baseApi } from "../../../../baseApi";
import { CreateProjectResponseData } from "./dto/manager.create.project.t";
import { CreateProjectRequestData } from "@/app/sh/[userId]/my-projects/components/createProject/create.project.schema";
import { GetManagerProjectsData } from "./dto/manager.get.project.dto";

const managerProjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation<
      TresponseFormat<CreateProjectResponseData>,
      CreateProjectRequestData
    >({
      query: (data) => ({
        url: `manager/projects`,
        method: "POST",
        data,
      }),
    }),

    getManagerProject: builder.query<
      TresponseFormat<GetManagerProjectsData>,
      {}
    >({
      query: () => ({
        url: `manager/projects`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateProjectMutation, useGetManagerProjectQuery } =
  managerProjectApi;
