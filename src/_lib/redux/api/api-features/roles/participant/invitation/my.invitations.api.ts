import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetInvitationsResponse } from "./dto/get.invitations.dto";

const managerInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendInvitation: builder.mutation<
      TresponseFormat<GetInvitationsResponse>,
      null
    >({
      query: (data) => ({
        url: "participant/invitations",
        method: "GET",
        data,
      }),
    }),
  }),
});
