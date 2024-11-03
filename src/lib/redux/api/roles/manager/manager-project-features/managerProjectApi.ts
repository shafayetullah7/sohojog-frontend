import { TresponseFormat } from "@/lib/redux/data-types/responseDataType";
import { baseApi } from "../../../baseApi";
import { CreateProjectResponseData } from "./manager.project.t";
import { CreateProjectRequestData } from "@/app/sh/[userId]/projects/components/createProject/CreateProject";

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
  }),
});

export const { useCreateProjectMutation } = managerProjectApi;
