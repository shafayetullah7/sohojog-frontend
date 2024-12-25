import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { baseApi } from "../../baseApi";
import { UploadUserFilesResponse } from "./dto/upload-files/response.dto";

const userFileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadUserFiles: builder.mutation<
      TresponseFormat<UploadUserFilesResponse>,
      FormData
    >({
      query: (body) => ({
        url: "user-files", // API endpoint for uploading user files
        method: "POST",
        data: body,
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly setting the content type
        },
      }),
      invalidatesTags: [{ type: "user-file", id: "LIST" }], // Invalidate related cache
    }),
  }),
});

export const { useUploadUserFilesMutation } = userFileApi;
