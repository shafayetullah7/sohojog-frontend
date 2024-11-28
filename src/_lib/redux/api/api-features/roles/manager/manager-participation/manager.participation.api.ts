import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { GetParticipationRequestDto } from "./dto/get-participations/request.dto";
import { GetProjectParticipantsResponseDto } from "./dto/get-participations/response.dto";

const managerParticipationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipations: builder.query<
      TresponseFormat<GetProjectParticipantsResponseDto>, // Response type
      GetParticipationRequestDto // Query type
    >({
      query: (data) => ({
        url: "manager/participations",
        method: "GET",
        params: data, // Pass query params as the `data` object
      }),
      providesTags: (result, error, arg) => {
        const participationTags = result?.data?.participations
          ? result.data.participations.map((participation) => ({
              type: "manager-participation" as const, // Explicitly cast to the allowed literal type
              id: participation.id,
            }))
          : []; // Default to empty array if participations is undefined

        return [
          { type: "manager-participation", id: "LIST" }, // Explicitly cast to the allowed literal type
          ...participationTags, // Spread the tags for each participation
        ];
      },
    }),
    // createParticipation: builder.mutation<
    //   TresponseFormat<ParticipationResponse>,
    //   ParticipationQueryType
    // >({
    //   query: (data) => ({
    //     url: "manager/participations",
    //     method: "POST",
    //     data,
    //   }),
    //   // Invalidates the cache for the participations list whenever a new participation is created
    //   invalidatesTags: [{ type: 'Participation', id: 'LIST' }],
    // }),
    // updateParticipation: builder.mutation<
    //   TresponseFormat<ParticipationResponse>,
    //   ParticipationQueryType
    // >({
    //   query: (data) => ({
    //     url: `manager/participations/${data.id}`,
    //     method: "PUT",
    //     data,
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     { type: 'Participation', id: arg.id },
    //     { type: 'Participation', id: 'LIST' },
    //   ],
    // }),
    // deleteParticipation: builder.mutation<
    //   TresponseFormat<ParticipationResponse>,
    //   { id: string }
    // >({
    //   query: (data) => ({
    //     url: `manager/participations/${data.id}`,
    //     method: "DELETE",
    //   }),
    //   // Invalidates the cache for the specific participation and the list
    //   invalidatesTags: (result, error, arg) => [
    //     { type: 'Participation', id: arg.id },
    //     { type: 'Participation', id: 'LIST' },
    //   ],
    // }),
  }),
  overrideExisting: false, // Optional: prevents overwriting the existing endpoints if redefined
});

export const {
  useGetParticipationsQuery,
  //   useCreateParticipationMutation,
  //   useUpdateParticipationMutation,
  //   useDeleteParticipationMutation,
} = managerParticipationApi;
