// src/sockets/socketConnections.ts

import { io, Socket } from "socket.io-client";
import { AppDispatch } from "../redux/store";
import { setSocket } from "../redux/features/webSocket/webSocketSlice";
import { Namespace, NAMESPACES } from "../redux/data-types/socket.namespaces";
import { LocalStorageService } from "../helpers/access/Access";
// import { NAMESPACES } from "../types/namespaces";
// import { setSocket } from "../store/slice/webSocketSlice";
// import { AppDispatch } from "../store/store"; // Assuming you have set up your store

// Create a cache to hold all sockets
let socketsCache: Record<string, Socket> = {};

export const connectToSocket = (
  namespace: Namespace,
  dispatch: AppDispatch
): Socket => {
  if (socketsCache[namespace] && socketsCache[namespace].connected) {
    return socketsCache[namespace];
  }

  const localStorageService = LocalStorageService.getInstance();

  const socket = io(NAMESPACES[namespace], {
    withCredentials: true,
    // retries: 5,

    auth: {
      token: localStorageService.token,
    },
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 5000,
  });

  socket.on("connect", () => {
    console.log(`Connected to namespace: ${namespace} with ID: ${socket.id}`);
    dispatch(setSocket({ namespace, socket }));
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from namespace: ${namespace}, Reason: ${reason}`);
  });

  socket.on("connect_error", (error) => {
    console.error(
      `Connection error in namespace: ${namespace}, Error: ${error.message}`
    );
  });

  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log(`Reconnect attempt #${attemptNumber}`);
  });

  socket.on("reconnect_failed", () => {
    console.log("All reconnection attempts failed.");
  });

  socketsCache[namespace] = socket;
  return socket;
};

export const connectToChat = (dispatch: AppDispatch) => {
  return connectToSocket("CHAT", dispatch);
};

export const connectToNotification = (dispatch: AppDispatch) => {
  return connectToSocket("NOTIFICATION", dispatch);
};
