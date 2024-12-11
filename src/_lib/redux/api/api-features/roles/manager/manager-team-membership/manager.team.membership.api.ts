import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { CreateTeamMembershipRequestDto } from "./dto/create-membership/request.dto";
import { CreateTeamMembershipResponseDto } from "./dto/create-membership/response.dto";
import { GetMembershipsResponse } from "./dto/get-memberships/response.dto";
import { TeamMembershipQuery } from "./dto/get-memberships/request.dto";

const teamMembershipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeamMembership: builder.mutation<
      TresponseFormat<CreateTeamMembershipResponseDto>,
      CreateTeamMembershipRequestDto
    >({
      query: (body) => ({
        url: "manager/team-memberships",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "team-membership", id: "LIST" }],
    }),
    getTeamMemberships: builder.query<
      TresponseFormat<GetMembershipsResponse>, // Replace `TeamMembership[]` with the actual expected response type
      Partial<TeamMembershipQuery>
    >({
      query: (params) => ({
        url: "manager/team-memberships",
        method: "GET",
        params, // Automatically adds query parameters
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.memberships?.map((membership) => ({
                type: "team-membership" as const,
                id: membership.id, // Ensure `id` exists in the response
              })),
              { type: "team-membership", id: "LIST" },
            ]
          : [{ type: "team-membership", id: "LIST" }],
    }),
  }),
});

export const { useCreateTeamMembershipMutation, useGetTeamMembershipsQuery } =
  teamMembershipApi;
