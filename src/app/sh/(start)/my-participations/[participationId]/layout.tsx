'use client'
import { useParams } from "next/navigation";
import { ProjectDetailsHeader } from "./components/ProjectDetailsHeader";
import { TaskManagement } from "./components/TaskManagement";

interface Props {
    children: React.ReactNode;
}

const ParticipantProjectlayout = ({ children }: Props) => {
    const params = useParams<{ participationId: string }>()
    return (
        <div className="space-y-6">
            <ProjectDetailsHeader participationId={params.participationId}></ProjectDetailsHeader>
            <TaskManagement participationId={params.participationId}></TaskManagement>
        </div>
    );
};

export default ParticipantProjectlayout;