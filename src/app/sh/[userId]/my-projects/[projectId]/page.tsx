"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, CheckCircleIcon, ClockIcon, EyeIcon, TagIcon, UsersIcon, DollarSignIcon, MailIcon, VideoIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetManagerSingleProjectQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi"
import { useParams } from "next/navigation"
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType"
import MyProjectHeading from "./my-project-components/MyProjectHeading"
import MyProjectParticipants from "./my-project-components/MyProjectParticipants"
import MyProjectTeams from "./my-project-components/MyProjectTeams"



// Mock data for the project
const project = {
    id: "1",
    title: "Website Redesign Project",
    description: "Redesign the company's main website to improve user experience and increase conversions. This project involves updating the UI/UX, improving performance, and implementing new features based on user feedback and analytics.",
    status: "ONGOING",
    priority: "HIGH",
    startDate: "2024-10-04T00:00:00.000Z",
    endDate: "2024-12-31T00:00:00.000Z",
    creator: {
        name: "John Doe",
        avatar: "/avatars/john-doe.jpg"
    },
    visibility: "PRIVATE",
    participants: [
        { name: "Alice Smith", role: "Designer", avatar: "/avatars/alice-smith.jpg" },
        { name: "Bob Johnson", role: "Developer", avatar: "/avatars/bob-johnson.jpg" },
        { name: "Carol Williams", role: "Project Manager", avatar: "/avatars/carol-williams.jpg" },
    ],
    tasks: [
        { id: "1", title: "Design new homepage", status: "Completed" },
        { id: "2", title: "Implement responsive layout", status: "In Progress" },
        { id: "3", title: "Optimize images and assets", status: "To Do" },
        { id: "4", title: "User testing and feedback", status: "To Do" },
    ],
    teams: ["Design Team", "Development Team", "QA Team"],
    tags: ["redesign", "website", "UX", "frontend"],
    progress: 65,
    totalHours: 240,
    budget: 50000,
    invitations: [
        { id: "1", name: "David Lee", email: "david.lee@example.com", status: "Pending" },
        { id: "2", name: "Emma Wilson", email: "emma.wilson@example.com", status: "Accepted" },
        { id: "3", name: "Frank Miller", email: "frank.miller@example.com", status: "Declined" },
    ],
    meetings: [
        { id: "1", title: "Weekly Progress Review", date: "2024-11-10T14:00:00.000Z", attendees: 5 },
        { id: "2", title: "Design Team Sync", date: "2024-11-12T10:00:00.000Z", attendees: 3 },
        { id: "3", title: "Stakeholder Update", date: "2024-11-15T15:30:00.000Z", attendees: 8 },
    ],
}

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

export default function MyProjectDetailsPage() {
    const { projectId } = useParams<{ projectId?: string }>(); // Type params to reflect optional projectId
    const [activeTab, setActiveTab] = useState("tasks");

    const projectIdString = projectId ?? ''; // Handle undefined cases gracefully

    // Execute query only when projectId is available
    const { data, isLoading, error } = useGetManagerSingleProjectQuery(
        { projectId: projectIdString },
        { skip: !projectId } // Conditionally skip query if projectId is not available
    );


    // throw new Error("Testing error");

    if (!projectId) {
        return <div>Project ID not found.</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    else {
        if (!data) {
            throw new Error("Project not found.")
        }
    }



    if (error) {
        const resError = error as TerrorResponse;
        return (
            <div className="text-red-500">
                Error fetching project: {resError.message}
            </div>
        );
    }

    // throw new Error("Testing error.")


    return (
        <div className="min-h-screen">
            {/* Header Section with Background Image */}
            {<MyProjectHeading projectId={projectId}></MyProjectHeading>}

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Project Statistics */}
                <Card className="mb-8">
                    <CardContent className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Progress</h3>
                                <div className="flex items-center">
                                    <Progress value={project.progress} className="h-2 flex-grow mr-2" />
                                    <span className="text-lg font-semibold">{project.progress}%</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Hours</h3>
                                <div className="flex items-center">
                                    <ClockIcon className="w-5 h-5 mr-2 text-gray-400" />
                                    <span className="text-lg font-semibold">{project.totalHours} hours</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Budget</h3>
                                <div className="flex items-center">
                                    <DollarSignIcon className="w-5 h-5 mr-2 text-gray-400" />
                                    <span className="text-lg font-semibold">${project.budget.toLocaleString()}</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Tasks Completed</h3>
                                <div className="flex items-center">
                                    <CheckCircleIcon className="w-5 h-5 mr-2 text-gray-400" />
                                    <span className="text-lg font-semibold">
                                        {project.tasks.filter(task => task.status === 'Completed').length} / {project.tasks.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="lg:w-3/5">
                        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                                <TabsTrigger value="invitations">Invitations</TabsTrigger>
                                <TabsTrigger value="meetings">Meetings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="tasks">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tasks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {project.tasks.map((task) => (
                                                <li key={task.id} className="flex items-center justify-between">
                                                    <span className="flex items-center">
                                                        <CheckCircleIcon className={`w-4 h-4 mr-2 ${task.status === 'Completed' ? 'text-green-500' : 'text-gray-300'}`} />
                                                        {task.title}
                                                    </span>
                                                    <Badge variant="outline">{task.status}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="invitations">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Invitations</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {project.invitations.map((invitation) => (
                                                <li key={invitation.id} className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{invitation.name}</p>
                                                        <p className="text-sm text-gray-600">{invitation.email}</p>
                                                    </div>
                                                    <Badge variant="outline" className={
                                                        invitation.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            invitation.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                                                'bg-red-100 text-red-800'
                                                    }>
                                                        {invitation.status}
                                                    </Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="meetings">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upcoming Meetings</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {project.meetings.map((meeting) => (
                                                <li key={meeting.id} className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{meeting.title}</p>
                                                        <p className="text-sm text-gray-600">{format(new Date(meeting.date), "MMM d, yyyy 'at' h:mm a")}</p>
                                                    </div>
                                                    <Badge variant="outline" className="flex items-center">
                                                        <UsersIcon className="w-3 h-3 mr-1" />
                                                        {meeting.attendees}
                                                    </Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-2/5 space-y-8">

                        <MyProjectParticipants></MyProjectParticipants>
                        <MyProjectTeams></MyProjectTeams>
                    </div>
                </div>
            </div>
        </div>
    )
}