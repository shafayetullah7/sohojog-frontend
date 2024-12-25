import { baseApi } from "./api/baseApi";
import userReducer from "./features/user/userSlice";
import webSocketReducer from "./features/webSocket/webSocketSlice";

export const reducer = {
  user: userReducer,
  webSocket: webSocketReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
