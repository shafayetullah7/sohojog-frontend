"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    TagIcon,
    UsersIcon,
    DollarSignIcon,
    MailIcon,
    VideoIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useGetManagerSingleProjectQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi";
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType";

const statusColors = {
    PLANNING: "bg-blue-100 text-blue-800",
    ONGOING: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-100 text-gray-800",
};

const priorityColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
};

type Props = {
    projectId: string;
};

const MyProjectHeading = ({ projectId }: Props) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const { data, isLoading, isError, error, isFetching } =
        useGetManagerSingleProjectQuery({ projectId });

    if (isLoading || isFetching) {
        return (
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
            </div>
        );
    }

    if (isError) {
        const err = error as TerrorResponse;
        return (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
                <div className="text-lg font-semibold">Error</div>
                <div>{err?.message || "Error fetching project"}</div>
            </div>
        );
    }

    const project = data?.data?.project;

    if (project) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4 rounded-lg shadow-md">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h1>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <Badge className={`${statusColors[project.status as keyof typeof statusColors]}`}>
                                {project.status}
                            </Badge>
                            <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                                {project.priority}
                            </Badge>
                            <Badge variant="outline" className="flex items-center">
                                <EyeIcon className="w-3 h-3 mr-1" />
                                {project.visibility}
                            </Badge>
                        </div>
                    </div>
                    <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarImage src={project.creator.profilePicture?.minUrl} alt={project.creator.name} />
                        <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        {showFullDescription
                            ? project.description
                            : `${project.description.slice(0, 100)}${project.description.length > 100 ? '...' : ''}`}
                    </p>
                    {project.description.length > 100 && (
                        <Button
                            variant="link"
                            className="p-0 h-auto text-blue-600 hover:text-blue-800"
                            onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                            {showFullDescription ? (
                                <>
                                    <ChevronUpIcon className="w-4 h-4 mr-1" />
                                    See less
                                </>
                            ) : (
                                <>
                                    <ChevronDownIcon className="w-4 h-4 mr-1" />
                                    See more
                                </>
                            )}
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                            {project.startDate && format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
                            {project.endDate && format(new Date(project.endDate), "MMM d, yyyy")}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{project.counts.participations || 0} Participants</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{project.counts.tasks || 0} Tasks</span>
                    </div>
                    {project.wallet && (
                        <div className="flex items-center">
                            <DollarSignIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{project.wallet.estimatedBudget} {project.wallet.currency}</span>
                        </div>
                    )}
                </div>

                {project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="flex items-center bg-white text-gray-600">
                                <TagIcon className="w-3 h-3 mr-1" />
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        );
    }
};

export default MyProjectHeading;