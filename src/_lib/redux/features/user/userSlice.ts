import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Tuser } from "../../data-types/userDataTypes";

// type Tuser = {
//   id: string;
//   role: "user";
//   email: string;
// };
type UserState = {
  user: Tuser | null;
};

// type AuthInfo = {
//   data: Tdata;
// };

const initialState: UserState = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Tuser>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
