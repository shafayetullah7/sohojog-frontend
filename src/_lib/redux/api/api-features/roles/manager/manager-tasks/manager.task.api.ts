import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { CreateTaskRequestDto } from "./dto/request.dto";
import { CreateTaskResponseDto } from "./dto/response.dto";

const managerTaskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation<
      TresponseFormat<CreateTaskResponseDto>,
      FormData
    >({
      query: (body) => ({
        url: "manager/tasks", // Adjust the URL to match your backend endpoint
        method: "POST",
        data: body,
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      }),
      invalidatesTags: [{ type: "task", id: "LIST" }], // Invalidates the list cache after task creation
    }),
  }),
});

export const { useCreateTaskMutation } = managerTaskApi;
