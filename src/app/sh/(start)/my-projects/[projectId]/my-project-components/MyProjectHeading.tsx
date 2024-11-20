"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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
    const { data, isLoading, isError, error, isFetching } =
        useGetManagerSingleProjectQuery({ projectId });

    // Handle loading, error, and successful data fetching
    if (isLoading || isFetching) {
        return (
            <div
                className="relative bg-cover bg-center h-96"
                style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-4 py-16 text-white">
                    <Skeleton className="h-10 w-3/4 mb-2 bg-gray-300" />
                    <Skeleton className="h-6 w-20 bg-gray-300" />
                    <Skeleton className="h-16 w-full mb-4 bg-gray-300" />
                    <Skeleton className="h-6 w-16 bg-gray-300" />
                    <Skeleton className="w-16 h-16 rounded-full bg-gray-300" />
                </div>
            </div>
        );
    }

    if (isError) {
        const err = error as TerrorResponse
        return (
            <div className="relative bg-cover bg-center h-96">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-4 py-16 text-white">
                    <div className="text-red-500 text-xl">{err?.message || "Error fetching project"}</div>
                </div>
            </div>
        );
    }

    const project = data?.data?.project; // Assuming the API returns data in a `project` field.

    if (project) {
        return (
            <div
                className="relative bg-cover bg-center h-96"
                style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>
                <div className="relative container mx-auto px-4 py-16 text-white">
                    <div className="flex justify-between items-start mb-8">
                        <div className="w-full">
                            <h1 className="text-4xl font-bold mb-2">{project?.title}</h1>

                            <div className="flex items-center mt-3 mb-7 space-x-2">
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
                            <p className="text-sm mb-4">{project?.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project?.tags.map((tag: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="flex items-center bg-white text-gray-800">
                                        <TagIcon className="w-3 h-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <Avatar className="w-16 h-16 border-2 border-white">
                            <AvatarImage src={project?.creator.profilePicture?.minUrl} alt={project?.creator.name} />
                            <AvatarFallback>{project?.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="flex items-center text-sm space-x-6">
                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span>
                                {project?.startDate && format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
                                {project?.endDate && format(new Date(project.endDate), "MMM d, yyyy")}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-2" />
                            <span>{project?.counts.participations || 0} Participants</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            <span>{project?.counts.tasks || 0} Tasks</span>
                        </div>
                        {project?.wallet && (
                            <div className="flex items-center">
                                <DollarSignIcon className="w-4 h-4 mr-2" />
                                <span>{project.wallet.estimatedBudget} {project.wallet.currency}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
};

export default MyProjectHeading;
