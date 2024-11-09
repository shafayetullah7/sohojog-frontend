import { SafeUserInfo } from "@/_constants/types/user.t";

export interface UpdateUserBody {
  name?: string | undefined;
}

export interface UpdateUserResponse {
  user: SafeUserInfo;
}
