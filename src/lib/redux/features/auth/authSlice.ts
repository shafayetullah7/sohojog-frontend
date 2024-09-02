import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Tuser = {
  id: string;
  role: "user";
  email: string;
};
type Tdata = {
  token: string | null;
  user: Tuser | null;
};

type AuthInfo = {
  data: Tdata;
};

const initialState: AuthInfo = { data: { token: null, user: null } };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuthInfo: (state: AuthInfo) => {
      return state;
    },
    setAuthInfo: (state, action: PayloadAction<Tdata>) => {
      state.data = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.data.token = action.payload;
    },
    setUser: (state, action: PayloadAction<Tuser>) => {
      state.data.user = action.payload;
    },
  },
});
export const { getAuthInfo, setAuthInfo, setToken, setUser } =
  authSlice.actions;
export default authSlice.reducer;
