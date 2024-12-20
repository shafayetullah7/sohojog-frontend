import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { baseApi } from "../../baseApi";
import { ProjectChatListQueryResponse } from "./dto/group-chats/response.dto";
import { ProjectChatListQueryRequest } from "./dto/group-chats/request.dto";

const messagingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupChatList: builder.query<
      TresponseFormat<ProjectChatListQueryResponse>,
      ProjectChatListQueryRequest
    >({
      query: () => ({
        url: `messages/group-chats`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "group-chats", id: "LIST" }] : [],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGroupChatListQuery } = messagingApi;
