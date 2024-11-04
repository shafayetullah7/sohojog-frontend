"use client";

import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UsersIcon, CheckSquareIcon, ArrowRightIcon } from "lucide-react";
import { ManagerProject } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/dto/manager.get.project.dto";
import { ProjectPriority, ProjectStatus } from "@/constants/enums/project.enums";



const statusColors: { [key in ProjectStatus]: string } = {
    PLANNING: "bg-blue-100 text-blue-800",
    ON_HOLD: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-green-200 text-green-900",
    // ONGOING: "bg-green-100 text-green-800",  // if ONGOING is needed separately
    COMPLETED: "bg-gray-100 text-gray-800",
};


const priorityColors: { [key in ProjectPriority]: string } = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
    CRITICAL: "bg-purple-100 text-purple-800", // Add a color for CRITICAL
};


interface MyProjectProps {
    project: ManagerProject;
}

export default function MyProject({ project }: MyProjectProps) {
    return (
        <Card className="w-full max-w-md mx-auto flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <Badge className={statusColors[project.status]}>
                        {project.status}
                    </Badge>
                </div>
                <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>
                            {format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <UsersIcon className="h-4 w-4 mr-2" />
                        <span>{project._count.participations} participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <CheckSquareIcon className="h-4 w-4 mr-2" />
                        <span>{project.taskCounts.total} tasks</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="h-full relative flex flex-col justify-end">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-2">
                        <Badge className={priorityColors[project.priority]}>
                            {project.priority}
                        </Badge>
                        <Avatar className="h-8 w-8">
                            {project.participations?.length && <AvatarImage src={project.participations[0]?.user.profilePicture?.minUrl || undefined} />}
                            {project.participations?.length && <AvatarFallback>{project.participations[0]?.user.name.charAt(0)}</AvatarFallback>}
                        </Avatar>
                    </div>
                    <Button variant="outline" size="sm">
                        View Project <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
