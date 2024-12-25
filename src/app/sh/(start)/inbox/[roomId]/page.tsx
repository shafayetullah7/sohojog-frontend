'use client'

import { useRef } from "react";
import ChatBox from "../components/ChatBox";

const RoomPage = () => {
    const renderCount = useRef(0);
    renderCount.current += 1;
    return (
        <div className="h-full bg-white rounded-2xl">
             <p>This component has rendered {renderCount.current} times.</p>
            {/* {params.roomId} */}
            <ChatBox></ChatBox>
        </div>
    );
};

export default RoomPage;