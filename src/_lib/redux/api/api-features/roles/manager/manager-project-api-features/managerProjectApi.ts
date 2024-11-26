import {
  TerrorResponse,
  TresponseFormat,
} from "@/_lib/redux/data-types/responseDataType";
import { baseApi } from "../../../../baseApi";
import { CreateProjectResponseData } from "./dto/manager.create.project.t";
import { GetManagerProjectsData } from "./dto/manager.get.project.dto";
import { ManagerSingleProjectResponse } from "./dto/manager.single.project";
import { ManagerSingleProjectParticipantsResponse } from "./dto/manager.get.single.project.participants";
import { CreateProjectRequestData } from "@/app/sh/(start)/my-projects/components/createProject/create.project.schema";

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

    getManagerSingleProject: builder.query<
      TresponseFormat<ManagerSingleProjectResponse>,
      { projectId: string }
    >({
      query: ({ projectId }) => ({
        url: `manager/projects/${projectId}`,
        method: "GET",
      }),
      providesTags: (result, error, { projectId }) => [
        { type: "manager-project", id: projectId },
      ],
    }),

    getManagerSingleProjectParticipans: builder.query<
      TresponseFormat<ManagerSingleProjectParticipantsResponse>,
      { projectId: string }
    >({
      query: ({ projectId }) => ({
        url: `manager/projects/${projectId}/participants`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetManagerProjectQuery,
  useGetManagerSingleProjectQuery,
  useGetManagerSingleProjectParticipansQuery,
} = managerProjectApi;
