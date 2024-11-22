import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetInvitationsResponse } from "./dto/getInvitations/get.invitations.response.dto";
import { GetParticipantInvitationsQueryParams } from "./dto/getInvitations/get.invitation.query.dto";
import { GetInvitationByIdParams } from "./dto/getSingleInvitation/request.dto";
import { GetSingleInvitationResponse } from "./dto/getSingleInvitation/response.dto";
import { UpdateInvitationSeenResponseDto } from "./dto/view-invitation/response.dto";
import { UpdateInvitationSeenRequestDto } from "./dto/view-invitation/request.dto";
import { UpdateInvitationStatusResponseDto } from "./dto/actionOnInvitation/response.dto";
import { UpdateInvitationStatusRequestDto } from "./dto/actionOnInvitation/request.dto";

const participantInvitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantInvitations: builder.query<
      TresponseFormat<GetInvitationsResponse>,
      GetParticipantInvitationsQueryParams
    >({
      query: (queryParams) => ({
        url: "participant/invitations",
        method: "GET",
        params: queryParams,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.invitations.map((inv) => ({
                type: "participant-invitation" as const,
                id: inv.id,
              })),
              { type: "participant-invitation", id: "LIST" },
            ]
          : [{ type: "participant-invitation", id: "LIST" }],
    }),
    getSingleParticipantInvitation: builder.query<
      TresponseFormat<GetSingleInvitationResponse>,
      GetInvitationByIdParams
    >({
      query: ({ id }) => ({
        url: `participant/invitations/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "participant-invitation", id },
      ],
    }),
    updateInvitationSeenStatus: builder.mutation<
      TresponseFormat<UpdateInvitationSeenResponseDto>, // Response type
      UpdateInvitationSeenRequestDto // Request type
    >({
      query: ({ params, body }) => ({
        url: `participant/invitations/${params.id}/see`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: (result, error, { params }) => [
        // { type: "participant-invitation", id: params.id },
        { type: "participant-invitation", id: "LIST" },
      ],
    }),
    updateInvitationStatus: builder.mutation<
      TresponseFormat<UpdateInvitationStatusResponseDto>, // Response type
      UpdateInvitationStatusRequestDto // Request type
    >({
      query: ({ params, body }) => ({
        url: `participant/invitations/${params.id}`,
        method: "PATCH",
        data: body, // The request body
      }),
      invalidatesTags: (result, error, { params }) => [
        { type: "participant-invitation", id: params.id },
        { type: "participant-invitation", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetParticipantInvitationsQuery,
  useGetSingleParticipantInvitationQuery,
  useUpdateInvitationSeenStatusMutation,
  useUpdateInvitationStatusMutation,
} = participantInvitationApi;
