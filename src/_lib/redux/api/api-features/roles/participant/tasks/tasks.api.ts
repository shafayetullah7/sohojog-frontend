import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetParticipationTaskResponse } from "./dto/get-tasks/response.dto";
import { QueryTaskDto } from "./dto/get-tasks/request.dto";
import { GetParticipantSingleTaskResponse } from "./dto/get-task-details/response.dto";

const participantTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantTasks: builder.query<
      TresponseFormat<GetParticipationTaskResponse>,
      QueryTaskDto
    >({
      query: (queryParams) => ({
        url: "participant/tasks",
        method: "GET",
        params: queryParams,
      }),
      providesTags: (result) =>
        result
          ? result.data.tasks.map((task) => ({
              type: "participation-task",
              id: task.id,
            }))
          : [{ type: "participation-task", id: "LIST" }],
    }),
    getParticipantSingleTask: builder.query<
      TresponseFormat<GetParticipantSingleTaskResponse>,
      string
    >({
      query: (taskId) => ({
        url: `participant/tasks/${taskId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "participation-task", id }],
    }),
  }),
});

// Export the hooks
export const { useGetParticipantTasksQuery, useGetParticipantSingleTaskQuery } =
  participantTaskApi;
