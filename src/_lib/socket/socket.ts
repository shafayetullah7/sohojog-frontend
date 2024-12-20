import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4000/chat";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (socket) {
    socket = null; 
  }
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
    });
  }

  socket.on("connect", () => {
    console.log("Connected to WebSocket server:");
    // console.log("Connected namespace:", socket?.ur); // Logs the namespace
  });

  socket.on("disconnect", (reason) => {
    console.log(`Disconnected from WebSocket server: ${reason}`);
  
    
  });
  

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error.message);
  
   
  });
  

  socket.on("fail",()=>{

  })

  return socket;
};
