'use client'

import { useParams } from "next/navigation";

const RoomPage = () => {
    const params = useParams<{ roomId: string }>()
    return (
        <div>
            {params.roomId}
        </div>
    );
};

export default RoomPage;