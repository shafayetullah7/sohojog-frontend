'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle2, Calendar, Users, Briefcase, AlertTriangle, TrendingUp } from 'lucide-react'

// Static project data
const projectData = {
    completedTasks: 18,
    totalTasks: 35,
    deadline: '2024-12-15',
    teams: 3,
    participants: 25,
    progress: 52,
    overdueTasks: 3,
}

export default function ProjectInfoBar() {
    return (
        <TooltipProvider>
            <Card className="mb-6 ">
                <CardContent className="py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <InfoItem
                            title="Tasks"
                            icon={<CheckCircle2 className="w-5 h-5 text-iceMint-600" />}
                            value={`${projectData.completedTasks}/${projectData.totalTasks}`}
                            subValue="Completed"
                            tooltip="Completed tasks vs Total tasks"
                        />
                        <InfoItem
                            title="Deadline"
                            icon={<Calendar className="w-5 h-5 text-iceMint-600" />}
                            value={formatDate(projectData.deadline)}
                            tooltip="Project deadline"
                        />
                        <InfoItem
                            title="Teams"
                            icon={<Briefcase className="w-5 h-5 text-iceMint-600" />}
                            value={projectData.teams.toString()}
                            subValue="Teams"
                            tooltip="Number of teams working on the project"
                        />
                        <InfoItem
                            title="Participants"
                            icon={<Users className="w-5 h-5 text-iceMint-600" />}
                            value={projectData.participants.toString()}
                            subValue="Members"
                            tooltip="Total participants involved across all teams"
                        />
                        <InfoItem
                            title="Progress"
                            icon={<TrendingUp className="w-5 h-5 text-iceMint-600" />}
                            value={`${projectData.progress}%`}
                            tooltip="Overall project progress"
                        >
                            <Progress value={projectData.progress} className="h-2 w-full mt-2" />
                        </InfoItem>
                        <InfoItem
                            title="Overdue"
                            icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
                            value={projectData.overdueTasks.toString()}
                            subValue="Tasks"
                            tooltip="Tasks that are past their deadlines"
                        />
                    </div>
                </CardContent>
            </Card>
        </TooltipProvider>
    )
}

interface InfoItemProps {
    title: string
    icon: React.ReactNode
    value: string
    subValue?: string
    tooltip: string
    children?: React.ReactNode
}

function InfoItem({ title, icon, value, subValue, tooltip, children }: InfoItemProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="bg-white p-3 rounded-lg  hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                        {icon}
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-xl font-bold text-iceMint-700">{value}</span>
                        {subValue && <span className="ml-1 text-sm text-gray-500">{subValue}</span>}
                    </div>
                    {children}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}