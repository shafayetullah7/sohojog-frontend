import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetProjectsResponseDto } from "./dto/get-participations/response.dto";
import { GetProjectDetailsResponseDto } from "./dto/get-project-detail/response.dto";

const participantProjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantProjects: builder.query<
      TresponseFormat<GetProjectsResponseDto>,
      void
    >({
      query: () => ({
        url: "participant/projects", // Backend endpoint
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? result.data.projects.map((project) => ({
              type: "participant-project",
              id: project.id,
            })) // Cache based on project IDs
          : [{ type: "participant-project", id: "LIST" }],
    }),
    getParticipantProjectDetails: builder.query<
      TresponseFormat<GetProjectDetailsResponseDto>,
      string
    >({
      query: (projectId) => ({
        url: `participant/projects/${projectId}`,
        method: "GET",
      }),
      providesTags: (result, error, projectId) => [
        { type: "participant-project", id: projectId },
      ], // Cache tagging for efficient updates
    }),
  }),
});

export const { useGetParticipantProjectsQuery, useGetParticipantProjectDetailsQuery } = participantProjectApi;
