import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import {
  SendInvitationResponse,
  SendInvitePayload,
} from "./dto/manager.send.invitation";

const managerInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation<
      TresponseFormat<SendInvitationResponse>,
      SendInvitePayload
    >({
      query: (data) => ({
        url: "manager/invitations",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useSendInvitationMutation } = managerInvitationApi;
