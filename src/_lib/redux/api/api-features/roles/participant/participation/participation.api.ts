import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetParticipationsResponseDto } from "./dto/get-participations/response.dto";
import { GetParticipationProjectDetailResponseDto } from "./dto/get-project-detail/response.dto";

const participantProjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantProjects: builder.query<
      TresponseFormat<GetParticipationsResponseDto>,
      void
    >({
      query: () => ({
        url: "participant/participations", // Backend endpoint
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? result.data.participations.map((participation) => ({
              type: "participation",
              id: participation.id,
            })) // Cache based on project IDs
          : [{ type: "participation", id: "LIST" }],
    }),
    getParticipantProjectDetails: builder.query<
      TresponseFormat<GetParticipationProjectDetailResponseDto>,
      string
    >({
      query: (participationId) => ({
        url: `participant/participations/${participationId}`,
        method: "GET",
      }),
      providesTags: (result, error, participationId) => [
        { type: "participation", id: participationId },
      ], // Cache tagging for efficient updates
    }),
  }),
});

export const {
  useGetParticipantProjectsQuery,
  useGetParticipantProjectDetailsQuery,
} = participantProjectApi;
