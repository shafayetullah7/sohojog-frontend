'use client'

import { useParams } from "next/navigation";
import { ParticipantTaskDetails } from "./components/ParticipantTaskDetails";

const ParticipantTaskDetailsPage = () => {

    const params = useParams<{ taskId: string }>()

    return (
        <div>
            <ParticipantTaskDetails taskId={params.taskId}></ParticipantTaskDetails>
        </div>
    );
};

export default ParticipantTaskDetailsPage;