'use client'

import { useParams } from "next/navigation";
import { ReactNode } from "react";
import MyProjectHeading from "./my-project-components/MyProjectHeading";
import ProjectNav from "./my-project-components/ProjectNav";

type Props = {
    children: ReactNode
}

const MyProjectDetailsLayout = ({ children }: Props) => {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <div className="h-full relative pb-20">
            <div>
                <MyProjectHeading projectId={projectId} />
                <ProjectNav />
            </div>

            {children}

        </div>
    );
};

export default MyProjectDetailsLayout;