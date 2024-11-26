import { baseApi } from "@/_lib/redux/api/baseApi";
import { TresponseFormat } from "@/_lib/redux/data-types/responseDataType";
import { WalletResponseData } from "./dto/enable-wallet/response.dto";
import { CreateWalletRequestData } from "./dto/enable-wallet/request.dto";

const managerProjectWalletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProjectWallet: builder.mutation<
      TresponseFormat<WalletResponseData>,
      CreateWalletRequestData
    >({
      query: (data) => ({
        url: `manager/project-wallet`,
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { projectId }) => [
        { type: "manager-project", id: projectId },
      ],
    }),
  }),
});

export const { useCreateProjectWalletMutation } = managerProjectWalletApi;
