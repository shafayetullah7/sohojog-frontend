import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { CreateTeamResponse } from "./dto/create-team/response.dto";
import { CreateTeamRequest } from "./dto/create-team/request.dto";
import { GetManagerTeamsResponse } from "./dto/get-teams/response.dto";
import { GetManagerTeamsRequestQueryDto } from "./dto/get-teams/request.dto";
import {
  GetManagerTeamDetailsResponseDto,
} from "./dto/get-single-team/get-team-details/response.dto";
import { GetManagerTeamDetailsRequestDto } from "./dto/get-single-team/get-team-details/request.dto";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation<
      TresponseFormat<CreateTeamResponse>,
      CreateTeamRequest
    >({
      query: (body) => ({
        url: "manager/teams",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "manager-team", id: "LIST" }],
    }),
    getManagerTeams: builder.query<
      TresponseFormat<GetManagerTeamsResponse>,
      GetManagerTeamsRequestQueryDto
    >({
      query: (queryParams) => ({
        url: `manager/teams`, // Append query string if exists
        method: "GET",
        params: queryParams,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.teams.map((team) => ({
                type: "manager-team" as const,
                id: team.id,
              })),
              { type: "manager-team", id: "LIST" },
            ]
          : [{ type: "manager-team", id: "LIST" }],
    }),
    getManagerTeamDetails: builder.query<
      TresponseFormat<GetManagerTeamDetailsResponseDto>,
      GetManagerTeamDetailsRequestDto
    >({
      query: ({ projectId, teamId }) => ({
        url: `manager/project-properties/${projectId}/teams/${teamId}`,
        method: "GET",
      }),
      providesTags: (result, error, { teamId }) =>
        result
          ? [{ type: "manager-team", id: teamId }]
          : [{ type: "manager-team", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetManagerTeamsQuery,
  useGetManagerTeamDetailsQuery,
} = teamApi;
