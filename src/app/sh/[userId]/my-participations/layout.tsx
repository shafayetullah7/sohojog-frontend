"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CheckCircle, XCircle, Calendar, FileText, AlertCircle, Check, X, Trash2, User, Activity, BarChart, Clock, Briefcase, Users, Mail } from 'lucide-react'

// Mock data
const projects = [
    { id: 1, name: "Project Alpha", newTasks: 3, newNotices: 2, createdBy: { name: "John Doe", image: "/placeholder.svg?height=32&width=32" }, createdAt: "2024-01-15" },
    { id: 2, name: "Project Beta", newTasks: 1, newNotices: 0, createdBy: { name: "Jane Smith", image: "/placeholder.svg?height=32&width=32" }, createdAt: "2024-02-01" },
    { id: 3, name: "Project Gamma", newTasks: 0, newNotices: 1, createdBy: { name: "Alice Johnson", image: "/placeholder.svg?height=32&width=32" }, createdAt: "2024-02-20" },
    { id: 4, name: "Project Delta", newTasks: 2, newNotices: 1, createdBy: { name: "Bob Wilson", image: "/placeholder.svg?height=32&width=32" }, createdAt: "2024-03-05" },
]

const invitations = [
    { id: 1, projectName: "Project Epsilon", status: "new", invitedBy: "Alice Johnson", date: "2024-03-05" },
    { id: 2, projectName: "Project Zeta", status: "accepted", invitedBy: "Bob Smith", date: "2024-03-02" },
    { id: 3, projectName: "Project Eta", status: "declined", invitedBy: "Charlie Brown", date: "2024-03-01" },
    { id: 4, projectName: "Project Theta", status: "new", invitedBy: "Diana Prince", date: "2024-03-07" },
]

const tasks = [
    { id: 1, title: "Complete user research", dueDate: "2024-03-15", priority: "High", assignedBy: "Team Lead" },
    { id: 2, title: "Design new landing page", dueDate: "2024-03-20", priority: "Medium", assignedBy: "Project Manager" },
    { id: 3, title: "Implement authentication system", dueDate: "2024-03-25", priority: "High", assignedBy: "Tech Lead" },
]

const notices = [
    { id: 1, title: "Team meeting rescheduled", date: "2024-03-10", type: "Info", postedBy: "Admin" },
    { id: 2, title: "New project guidelines", date: "2024-03-12", type: "Important", postedBy: "Project Manager" },
    { id: 3, title: "System maintenance", date: "2024-03-18", type: "Warning", postedBy: "IT Department" },
]

const meetings = [
    { id: 1, title: "Sprint Planning", date: "2024-03-14", time: "10:00 AM", organizer: "Scrum Master" },
    { id: 2, title: "Client Presentation", date: "2024-03-16", time: "2:00 PM", organizer: "Account Manager" },
    { id: 3, title: "Team Retrospective", date: "2024-03-17", time: "11:00 AM", organizer: "Team Lead" },
]

export default function MyParticipationsLayout() {
    const [selectedProject, setSelectedProject] = useState(projects[0])
    const [invitationFilter, setInvitationFilter] = useState("all")

    const filteredInvitations = invitations.filter(invitation =>
        invitationFilter === "all" || invitation.status === invitationFilter
    )

    const handleInvitationAction = (id: number, action: 'accept' | 'decline' | 'delete') => {
        console.log(`Invitation ${id} ${action}ed`)
        // Here you would typically update the invitation status or remove it
    }

    return (
        <div className="flex h-screen bg-white">
            <div className="flex-grow p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">User Dashboard</h1>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gray-900 flex items-center">
                            <Briefcase className="mr-2 h-6 w-6" />
                            Dashboard: {selectedProject.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="tasks" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="tasks">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Tasks
                                </TabsTrigger>
                                <TabsTrigger value="notices">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Notices
                                </TabsTrigger>
                                <TabsTrigger value="meetings">
                                    <Users className="mr-2 h-4 w-4" />
                                    Meetings
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="tasks">
                                <ScrollArea className="h-[calc(100vh-250px)]">
                                    <div className="space-y-4 pr-4">
                                        {tasks.map((task) => (
                                            <Card key={task.id} className="hover:shadow-md transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                                                        <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
                                                            {task.priority}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Due: {task.dueDate}
                                                    </p>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Assigned by: {task.assignedBy}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="notices">
                                <ScrollArea className="h-[calc(100vh-250px)]">
                                    <div className="space-y-4 pr-4">
                                        {notices.map((notice) => (
                                            <Card key={notice.id} className="hover:shadow-md transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-semibold text-lg text-gray-900">{notice.title}</h3>
                                                        <Badge variant={notice.type === "Warning" ? "destructive" : "secondary"}>
                                                            {notice.type}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Date: {notice.date}
                                                    </p>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Posted by: {notice.postedBy}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="meetings">
                                <ScrollArea className="h-[calc(100vh-250px)]">
                                    <div className="space-y-4 pr-4">
                                        {meetings.map((meeting) => (
                                            <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="font-semibold text-lg text-gray-900">{meeting.title}</h3>
                                                        <Badge variant="outline">
                                                            <Clock className="mr-2 h-4 w-4" />
                                                            {meeting.time}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Date: {meeting.date}
                                                    </p>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Organizer: {meeting.organizer}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <div className="w-96 bg-gray-50 p-6 overflow-y-auto">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-gray-900">Projects & Invitations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="projects" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-4">
                                <TabsTrigger value="projects">
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    Projects
                                </TabsTrigger>
                                <TabsTrigger value="invitations">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Invitations
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="projects">
                                <ScrollArea className="h-[calc(100vh-200px)]">
                                    <div className="space-y-4 pr-4">
                                        {projects.map((project) => (
                                            <Card
                                                key={project.id}
                                                className={`cursor-pointer transition-all hover:shadow-md ${selectedProject?.id === project.id ? "bg-blue-50" : ""
                                                    }`}
                                                onClick={() => setSelectedProject(project)}
                                            >
                                                <CardContent className="p-4">
                                                    <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                                                    <div className="flex items-center mt-2">
                                                        <Avatar className="h-6 w-6 mr-2">
                                                            <AvatarImage src={project.createdBy.image} alt={project.createdBy.name} />
                                                            <AvatarFallback>{project.createdBy.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className="text-sm text-gray-500">{project.createdBy.name}</p>
                                                    </div>
                                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Created on: {project.createdAt}
                                                    </p>
                                                    <div className="flex space-x-2 mt-2">
                                                        {project.newTasks > 0 && (
                                                            <Badge variant="secondary">
                                                                <FileText className="mr-1 h-3 w-3" />
                                                                {project.newTasks} tasks
                                                            </Badge>
                                                        )}
                                                        {project.newNotices > 0 && (
                                                            <Badge variant="secondary">
                                                                <Bell className="mr-1 h-3 w-3" />
                                                                {project.newNotices} notices
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="invitations">
                                <div className="mb-4">
                                    <Select onValueChange={setInvitationFilter} defaultValue="all">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter invitations" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="new">Pending</SelectItem>
                                            <SelectItem value="accepted">Accepted</SelectItem>
                                            <SelectItem value="declined">Declined</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <ScrollArea className="h-[calc(100vh-250px)]">
                                    <div className="space-y-4 pr-4">
                                        {filteredInvitations.map((invitation) => (
                                            <Card key={invitation.id} className="hover:shadow-md transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-semibold text-lg text-gray-900">{invitation.projectName}</h3>
                                                        {invitation.status === "new" ? (
                                                            <div className="flex space-x-2">
                                                                <Button size="sm" variant="outline" className="p-1" onClick={() => handleInvitationAction(invitation.id, 'accept')}>
                                                                    <Check className="h-4 w-4 text-green-500" />
                                                                </Button>
                                                                <Button size="sm" variant="outline" className="p-1" onClick={() => handleInvitationAction(invitation.id, 'decline')}>
                                                                    <X className="h-4 w-4 text-red-500" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Button size="sm" variant="outline" className="p-1" onClick={() => handleInvitationAction(invitation.id, 'delete')}>
                                                                <Trash2 className="h-4 w-4 text-gray-500" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Invited by: {invitation.invitedBy}
                                                    </p>
                                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                                        <Calendar className="mr-2 h-4 w-4" />
                                                        Date: {invitation.date}
                                                    </p>
                                                    <Badge
                                                        variant={invitation.status === "new" ? "secondary" : invitation.status === "accepted" ? "default" : "destructive"}
                                                        className="mt-2"
                                                    >
                                                        {invitation.status === "new" && <Bell className="mr-1 h-3 w-3" />}
                                                        {invitation.status === "accepted" && <CheckCircle className="mr-1 h-3 w-3" />}
                                                        {invitation.status === "declined" && <XCircle className="mr-1 h-3 w-3" />}
                                                        {invitation.status}
                                                    </Badge>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}