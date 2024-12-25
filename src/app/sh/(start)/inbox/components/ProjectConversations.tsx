import { useState } from "react";
import { ProjectItem } from "./ProjectItem";
import { useGetGroupChatListQuery } from "@/_lib/redux/api/api-features/message/messaging.api";
import { ProjectChatListQueryRequest } from "@/_lib/redux/api/api-features/message/dto/group-chats/request.dto";

type ProjectFilter = 'all' | 'myProjects' | 'participatedProjects';

const ProjectConversations = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');
    const [query, setQuery] = useState<ProjectChatListQueryRequest>({ page: 1 });

    const { data: projectChatData } = useGetGroupChatListQuery(query);
    // console.log('on project conversation page');

    const projects = projectChatData?.data?.projects || [];
    // console.log({ projects });



    return (
        <div className="p-4 space-y-4">
            {projects?.length && projects?.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
    );
};

export default ProjectConversations;