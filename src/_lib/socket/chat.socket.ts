import { io, Socket } from "socket.io-client";

const CHAT_SOCKET_URL = "http://localhost:4000/chat";

let chatSocket: Socket | null = null;

/**
 * Initializes or returns an existing chat socket connection.
 * @returns {Socket} - The chat socket instance
 */
export const getChatSocket = (): Socket => {
  // Reset the chat socket if it exists
  if (chatSocket) {
    chatSocket.disconnect(); // Gracefully disconnect if needed
    chatSocket = null;
  }

  // Initialize the chat socket if not already done
  if (!chatSocket) {
    chatSocket = io(CHAT_SOCKET_URL, {
      withCredentials: true, // Include credentials in requests
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
