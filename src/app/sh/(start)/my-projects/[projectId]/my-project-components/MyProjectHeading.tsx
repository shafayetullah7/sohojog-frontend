"use client"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, CheckCircleIcon, ClockIcon, EyeIcon, TagIcon, UsersIcon, DollarSignIcon, ChevronDownIcon, ChevronUpIcon, WalletIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGetManagerSingleProjectQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi"
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WalletEnableDialog from "./WalletEnableDialog"

const statusColors = {
    PLANNING: "bg-blue-100 text-blue-800",
    ONGOING: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-100 text-gray-800",
}

const priorityColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
}

type Props = {
    projectId: string
}

export default function MyProjectHeading({ projectId }: Props) {
    const [isExpanded, setIsExpanded] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const { data, isLoading, isError, error, isFetching } =
        useGetManagerSingleProjectQuery({ projectId })

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isExpanded
                ? `${contentRef.current.scrollHeight}px`
                : '0px'
        }
    }, [isExpanded, data])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

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
        )
    }

    if (isError) {
        const err = error as TerrorResponse
        return (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <div className="text-lg font-semibold">Error</div>
                    <div>{err?.message || "Error fetching project"}</div>
                </div>
                <div className="md:col-span-1">
                    <Skeleton className="h-40 w-full rounded-lg" />
                </div>
            </div>
        )
    }

    const project = data?.data?.project

    if (project) {
        return (
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 shadow-md transition-all duration-300 ease-in-out">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-between">
                                {project.title}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="p-1 h-auto text-gray-500 hover:text-gray-700"
                                    onClick={toggleExpand}
                                    aria-expanded={isExpanded}
                                    aria-controls="project-details"
                                >
                                    {isExpanded ? (
                                        <ChevronUpIcon className="w-5 h-5" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5" />
                                    )}
                                    <span className="sr-only">{isExpanded ? 'Collapse details' : 'Expand details'}</span>
                                </Button>
                            </CardTitle>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
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
                </CardHeader>
                <CardContent>
                    <div
                        ref={contentRef}
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                    >
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                {project.description}
                            </p>
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
                        <div className="mt-4">
                            <div>
                                {project.wallet ? (
                                    <div className="text-sm font-medium flex w-fit gap-2 items-center ">
                                        <WalletIcon className="w-4 h-4 mr-2 text-gray-500" />

                                        <div className="flex w-fit items-center gap-3">
                                            <p className="text-gray-600">Balance: <span className="font-medium">{project.wallet.balance} {project.wallet.currency}</span></p>
                                            <p className="text-gray-400">|</p>
                                            <p className="text-gray-600">Budget: <span className="font-medium">{project.wallet.estimatedBudget} {project.wallet.currency}</span></p>
                                        </div>
                                    </div>
                                ) : (
                                    <WalletEnableDialog />
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
}