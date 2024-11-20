import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetInvitationsResponse } from "./dto/get.invitations.response.dto";
import { GetParticipantInvitationsQueryParams } from "./dto/get.invitation.query.dto";

const participantInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantInvitations: builder.mutation<
      TresponseFormat<GetInvitationsResponse>,
      GetParticipantInvitationsQueryParams
    >({
      query: (queryParams) => ({
        url: "participant/invitations",
        method: "GET",
        params: queryParams,
      }),
    }),
  }),
});

export const { useGetParticipantInvitationsMutation } =
  participantInvitationApi;
