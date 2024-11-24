import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { CreateTeamResponse } from "./dto/create-team/response.dto";
import { CreateTeamRequest } from "./dto/create-team/request.dto";
import { GetManagerTeamsResponse } from "./dto/get-teams/response.dto";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation<
      TresponseFormat<CreateTeamResponse>, // Response type
      CreateTeamRequest // Request type
    >({
      query: (body) => ({
        url: "manager/teams",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "manager-team", id: "LIST" }], // Invalidate the team list cache after creation
    }),
    getManagerTeams: builder.query<
      TresponseFormat<GetManagerTeamsResponse>, // Response type
      void // No query parameters for now (can be customized)
    >({
      query: () => ({
        url: "manager/teams",
        method: "GET",
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
  }),
});

export const { useCreateTeamMutation, useGetManagerTeamsQuery } = teamApi;
