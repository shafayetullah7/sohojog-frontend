import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { baseApi } from "../../baseApi";
import { ProjectChatListQueryResponse } from "./dto/group-chats/response.dto";
import { ProjectChatListQueryRequest } from "./dto/group-chats/request.dto";
import { MessageQueryResponse } from "./dto/get-messages/response.dto";
import { MessageQueryRequest } from "./dto/get-messages/request.dto";

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
    getMessages: builder.query<
      TresponseFormat<MessageQueryResponse>,
      MessageQueryRequest
    >({
      query: (params) => ({
        url: `messages/${params.roomId}`,
        method: "GET",
        params: { page: params.page || 1, limit: params.limit || 20 },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "messages", id: "LIST" },
              ...result.data.messages?.map(({ id }) => ({
                type: "messages" as const,
                id,
              })),
            ]
          : [{ type: "messages" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetGroupChatListQuery, useGetMessagesQuery } = messagingApi;
