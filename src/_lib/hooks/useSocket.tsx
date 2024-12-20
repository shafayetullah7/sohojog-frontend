import { getSocket } from "@/_lib/socket/socket";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const useSocket = (): Socket | null => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = getSocket();
        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return socket;
};

export default useSocket;
