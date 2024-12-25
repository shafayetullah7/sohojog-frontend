// src/store/slice/webSocketSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { Namespace, NAMESPACES } from "../../data-types/socket.namespaces";

// Define state type
interface WebSocketState {
  sockets: Record<Namespace, Socket | null>;
}

const initialState: WebSocketState = {
  sockets: {
    CHAT: null,
    NOTIFICATION: null,
  },
};

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState,
  reducers: {
    setSocket: (
      state,
      action: PayloadAction<{ namespace: Namespace; socket: Socket }>
    ) => {
      const { namespace, socket } = action.payload;

      state.sockets = {
        ...state.sockets,
        [namespace]: socket,
      };
    },
  },
});

export const { setSocket } = webSocketSlice.actions;
export default webSocketSlice.reducer;
