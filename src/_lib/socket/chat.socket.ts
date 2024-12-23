import { io, Socket } from "socket.io-client";
import { LocalStorageService } from "../helpers/access/Access";

const CHAT_SOCKET_URL = "http://localhost:4000/chat";

let chatSocket: Socket | null = null;

export const getChatSocket = (): Socket => {
  // Reset the chat socket if it exists
  if (chatSocket) {
    // chatSocket.disconnect(); // Gracefully disconnect if needed
    // chatSocket = null;
    // console.log("chat is here");
    return chatSocket;
  }

  const token = LocalStorageService.getInstance().token;

  if (!chatSocket) {
    chatSocket = io(CHAT_SOCKET_URL, {
      withCredentials: true, // Include credentials in requests
      auth: {
        token: token,
      },
    });

    // Handle successful connection
    chatSocket.on("connect", () => {
      console.log("Connected to chat namespace:", chatSocket?.id);
    });

    // Handle disconnection
    chatSocket.on("disconnect", (reason) => {
      console.log(`Disconnected from chat namespace: ${reason}`);
      if (reason === "io server disconnect") {
        // Attempt to reconnect if server disconnects
        chatSocket?.connect();
      }
    });

    // Handle connection errors
    chatSocket.on("connect_error", (error) => {
      console.error("Chat connection error:", error.message);
      // Optionally retry connection
    });

    // Additional custom event listeners
    chatSocket.on("fail", () => {
      console.error("Chat connection failed.");
    });
  }

  return chatSocket;
};
