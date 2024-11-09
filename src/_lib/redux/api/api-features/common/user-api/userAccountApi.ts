import { TresponseFormat } from "../../../../data-types/responseDataType";
import { Tuser, TuserResponse } from "../../../../data-types/userDataTypes";
import { baseApi } from "../../../baseApi";
import { ProfilePictureUpdateResponse } from "./dto/profile.picture.update.dto";
import { UpdateUserBody, UpdateUserResponse } from "./dto/user.update.dto";

export const userAccountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<TresponseFormat<TuserResponse>, void>({
      query: () => ({
        url: "user/get-me",
      }),
    }),
    updateUser: builder.query<
      TresponseFormat<UpdateUserResponse>,
      UpdateUserBody
    >({
      query: (data: UpdateUserBody) => ({
        url: "user",
        method: "PATCH",
        data: data,
      }),
    }),
    updateProfilePicture: builder.query<
      TresponseFormat<ProfilePictureUpdateResponse>,
      FormData
    >({
      query: (formData: FormData) => ({
        url: "user/profile-picture",
        method: "PATCH",
        data: formData,
      }),
    }),
  }),
});

export const { useGetMeQuery } = userAccountApi;
