// src/hooks/useGetChatSocket.ts

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Socket } from "socket.io-client";
import { RootState } from "../redux/store";
import { connectToChat } from "../socket/socketConnections";

export const useGetChatSocket = (): Socket | null => {
  const dispatch = useDispatch();
  const chatSocket = useSelector(
    (state: RootState) => state.webSocket.sockets.CHAT
  );

  useEffect(() => {
    if (!chatSocket || !chatSocket.connected) {
      connectToChat(dispatch);
    }
  }, [chatSocket, dispatch]);

  return chatSocket;
};
