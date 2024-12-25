import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getChatSocket } from "@/_lib/socket/chat.socket";

const useChatSocket = (): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = getChatSocket();
        setSocket(socketInstance);

        return () => {
            if (socketInstance.connected) {
                socketInstance.removeAllListeners();
                socketInstance.disconnect();
            }
        };
    }, []);

    return socket;
};

export default useChatSocket;
