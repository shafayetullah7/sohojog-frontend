'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Briefcase, Calendar, FileText } from 'lucide-react'

type Project = {
    id: number;
    name: string;
    newTasks: number;
    newNotices: number;
    createdBy: {
        name: string;
        image: string;
    };
    createdAt: string;
}

const projects: Project[] = [
    {
        id: 1,
        name: "Comprehensive Research and Development for Project Alpha",
        newTasks: 3,
        newNotices: 2,
        createdBy: { name: "Jonathan Alexander Doe", image: "/placeholder.svg?height=32&width=32" },
        createdAt: "2024-01-15"
    },
    {
        id: 2,
        name: "Strategic Planning Initiative for Beta Product Launch",
        newTasks: 1,
        newNotices: 0,
        createdBy: { name: "Janet Elizabeth Smith", image: "/placeholder.svg?height=32&width=32" },
        createdAt: "2024-02-01"
    },
    {
        id: 3,
        name: "Feasibility Study and Execution of Gamma Expansion Strategy",
        newTasks: 0,
        newNotices: 1,
        createdBy: { name: "Alice Margaret Johnson", image: "/placeholder.svg?height=32&width=32" },
        createdAt: "2024-02-20"
    },
    {
        id: 4,
        name: "Project Delta: Advanced Market Penetration Analysis",
        newTasks: 2,
        newNotices: 1,
        createdBy: { name: "Robert Edward Wilson", image: "/placeholder.svg?height=32&width=32" },
        createdAt: "2024-03-05"
    }
];


export default function ParticipationRightBar() {
    const [selectedProject, setSelectedProject] = React.useState<Project | null>(projects[0] || null)

    return (
        <div className="w-full h-full overflow-y-auto bg-background bg-white rounded-3xl">
            <div className="p-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center mb-4">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Projects
                </h2>
                <ScrollArea className="h-[calc(100vh-120px)]">
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`py-2 px-4 rounded-2xl cursor-pointer transition-all 
            ${selectedProject?.id === project.id
                                        ? "bg-lavender-blush-400-tr-bl text-white" // Selected item styles
                                        : "hover:bg-lavender-blush-100-tr-bl text-foreground"}`} // Default and hover styles
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0 mr-2">
                                        <h3
                                            className={`font-semibold text-sm truncate 
                        ${selectedProject?.id === project.id ? "text-white" : "text-foreground"}`}
                                            title={project.name}
                                        >
                                            {project.name}
                                        </h3>
                                        <div className={`flex items-center mt-1 text-xs 
                    ${selectedProject?.id === project.id ? "text-white" : "text-muted-foreground"}`}>
                                            <Avatar className="size-5 mr-1">
                                                <AvatarImage src={project.createdBy.image} alt={project.createdBy.name} />
                                                <AvatarFallback>{project.createdBy.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span
                                                className={`truncate max-w-[100px] font-medium 
                            ${selectedProject?.id === project.id ? "text-white" : "text-gray-700"}`}
                                                title={project.createdBy.name}
                                            >
                                                {project.createdBy.name}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-xs flex items-center mt-1 
                        ${selectedProject?.id === project.id ? "text-white" : "text-gray-400"}`}>
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {project.createdAt}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end space-y-1 text-gray-700">
                                        {project.newTasks > 0 && (
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs flex items-center 
                            ${selectedProject?.id === project.id ? "text-white" : ""}`}
                                            >
                                                <FileText className="mr-1 h-4 w-4" />
                                                {project.newTasks}
                                            </Badge>
                                        )}
                                        {project.newNotices > 0 && (
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs flex items-center 
                            ${selectedProject?.id === project.id ? "text-white" : ""}`}
                                            >
                                                <Bell className="mr-1 size-4" />
                                                {project.newNotices}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}