import { baseApi } from "./api/baseApi";
import userReducer from "./features/user/userSlice";

export const reducer = {
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
