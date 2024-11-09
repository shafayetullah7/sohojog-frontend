"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, CheckCircleIcon, ClockIcon, EyeIcon, TagIcon, UsersIcon, DollarSignIcon, MailIcon, VideoIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function ProjectDetailsPage() {
    const [activeTab, setActiveTab] = useState("tasks")

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section with Background Image */}
            <div
                className="relative bg-cover bg-center h-96"
                style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-4 py-16 text-white">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
                            <div className="flex space-x-2 mb-4">
                                <Badge className={`${statusColors[project.status as keyof typeof statusColors]} text-xs`}>
                                    {project.status}
                                </Badge>
                                <Badge className={`${priorityColors[project.priority as keyof typeof priorityColors]} text-xs`}>
                                    {project.priority}
                                </Badge>
                                <Badge variant="outline" className="flex items-center text-xs">
                                    <EyeIcon className="w-3 h-3 mr-1" />
                                    {project.visibility}
                                </Badge>
                            </div>
                            <p className="text-sm mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="flex items-center bg-white text-gray-800">
                                        <TagIcon className="w-3 h-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <Avatar className="w-16 h-16 border-2 border-white">
                            <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                            <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex items-center text-sm space-x-6">
                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            <span>{format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-2" />
                            <span>{project.participants.length} Participants</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            <span>{project.totalHours} Hours</span>
                        </div>
                    </div>
                </div>
            </div>

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
                        <Card>
                            <CardHeader>
                                <CardTitle>Participants</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4">
                                    {project.participants.map((participant, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src={participant.avatar} alt={participant.name} />
                                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{participant.name}</p>
                                                <p className="text-sm text-gray-600">{participant.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Teams</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside">
                                    {project.teams.map((team, index) => (
                                        <li key={index}>{team}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}