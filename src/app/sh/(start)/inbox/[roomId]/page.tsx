'use client'

import ChatBox from "../components/ChatBox";

const RoomPage = () => {
    return (
        <div className="h-full bg-white rounded-2xl">
            {/* {params.roomId} */}
            <ChatBox></ChatBox>
        </div>
    );
};

export default RoomPage;