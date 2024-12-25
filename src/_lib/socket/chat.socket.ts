import { io, Socket } from "socket.io-client";
import { LocalStorageService } from "../helpers/access/Access";

const CHAT_SOCKET_URL = "http://localhost:4000/chat";
let chatSocket: Socket | null = null;

const setupSocketListeners = (socket: Socket) => {
  socket.on("connect", () => {
    console.log("Connected to chat namespace:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from chat namespace: ${reason}`);
    if (reason === "io server disconnect") {
      socket.connect();
    }
  });

  socket.on("connect_error", (error) => {
    console.error("Chat connection error:", error.message);
  });

  socket.on("fail", () => {
    console.error("Chat connection failed.");
  });
};

export const getChatSocket = (): Socket => {
  if (chatSocket && chatSocket.connected) {
    return chatSocket;
  }

  const token = LocalStorageService.getInstance().token;

  if (!chatSocket || !chatSocket.connected) {
    chatSocket = io(CHAT_SOCKET_URL, {
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
      forceNew: false,
      auth: { token }
    });
    
    setupSocketListeners(chatSocket);
  }

  return chatSocket;
};