"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Briefcase,
    CheckCircle2,
    Clock,
    FileText,
    Users,
    Bell,
    Calendar,
    MessageSquare,
    AlertTriangle,
    User,
    Mail,
    PhoneCall,
    CheckSquare,
    XSquare,
    ChevronDown,
    ChevronUp,
} from "lucide-react"

// Mock data (unchanged from previous example)
const projects = [
    { id: 1, name: "Project Alpha", role: "Team Lead", status: "Active" },
    { id: 2, name: "Project Beta", role: "Developer", status: "Active" },
    { id: 3, name: "Project Gamma", role: "Designer", status: "Completed" },
    { id: 4, name: "Project Delta", role: "Developer", status: "Upcoming" },
]

const tasks = [
    { id: 1, title: "Implement user authentication", project: "Project Alpha", priority: "High", dueDate: "2024-03-20", status: "In Progress" },
    { id: 2, title: "Design landing page", project: "Project Beta", priority: "Medium", dueDate: "2024-03-22", status: "Not Started" },
    { id: 3, title: "Optimize database queries", project: "Project Alpha", priority: "High", dueDate: "2024-03-25", status: "In Progress" },
    { id: 4, title: "Write API documentation", project: "Project Beta", priority: "Low", dueDate: "2024-03-28", status: "Completed" },
    { id: 5, title: "Conduct user testing", project: "Project Alpha", priority: "Medium", dueDate: "2024-04-01", status: "Not Started" },
]

const meetings = [
    { id: 1, title: "Project Alpha Sprint Planning", date: "2024-03-18", time: "10:00 AM" },
    { id: 2, title: "Project Beta Design Review", date: "2024-03-19", time: "2:00 PM" },
    { id: 3, title: "Team Leads Sync", date: "2024-03-20", time: "11:00 AM" },
]

const notices = [
    { id: 1, title: "Project Alpha milestone reached", type: "Success", date: "2024-03-15" },
    { id: 2, title: "New security protocol implementation", type: "Important", date: "2024-03-17" },
]

const activityFeed = [
    { id: 1, type: "task_assigned", project: "Project Alpha", description: "New task assigned: Implement user profiles", time: "2 hours ago" },
    { id: 2, type: "comment", project: "Project Beta", description: "New comment on 'API Documentation'", time: "5 hours ago" },
    { id: 3, type: "status_update", project: "Project Alpha", description: "Task 'User Authentication' marked as complete", time: "1 day ago" },
]

const teams = [
    { id: 1, name: "Project Alpha Team", members: 8, lead: { name: "John Doe", email: "john@example.com", phone: "+1234567890" } },
    { id: 2, name: "Project Beta Frontend", members: 5, lead: { name: "Jane Smith", email: "jane@example.com", phone: "+1987654321" } },
]

const invitations = [
    { id: 1, project: "Project Epsilon", role: "Developer", from: "Alice Johnson" },
    { id: 2, project: "Project Zeta", role: "Designer", from: "Bob Williams" },
]

const approvals = [
    { id: 1, type: "Task", title: "Review API changes", project: "Project Alpha", requestedBy: "Charlie Brown" },
    { id: 2, type: "Document", title: "Sign off on Q2 roadmap", project: "Project Beta", requestedBy: "Diana Prince" },
]

export default function MyParticipationsPage() {
    const [expandedSections, setExpandedSections] = useState({
        tasks: true,
        meetings: true,
        teams: true,
        invitations: true,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    const totalProjects = projects.length
    const activeProjects = projects.filter(p => p.status === "Active").length
    const completedProjects = projects.filter(p => p.status === "Completed").length
    const upcomingProjects = projects.filter(p => p.status === "Upcoming").length

    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.status === "Completed").length
    const highPriorityTasks = tasks.filter(t => t.priority === "High").length

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projects</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProjects}</div>
                        <p className="text-xs text-muted-foreground">
                            {activeProjects} Active, {completedProjects} Completed, {upcomingProjects} Upcoming
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedTasks} / {totalTasks}</div>
                        <Progress value={(completedTasks / totalTasks) * 100} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Meetings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{meetings.length}</div>
                        <p className="text-xs text-muted-foreground">Next: {meetings[0]?.title}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{invitations.length + approvals.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {invitations.length} Invitations, {approvals.length} Approvals
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Collapsible
                open={expandedSections.tasks}
                onOpenChange={() => toggleSection('tasks')}
            >
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex w-full justify-between p-2">
                        <span className="text-lg font-semibold">Tasks</span>
                        {expandedSections.tasks ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Card>
                        <CardContent className="p-4">
                            <ScrollArea className="h-[300px]">
                                {tasks.map((task) => (
                                    <div key={task.id} className="flex justify-between items-center mb-4 last:mb-0">
                                        <div>
                                            <h3 className="font-semibold">{task.title}</h3>
                                            <p className="text-sm text-muted-foreground">{task.project} - Due: {task.dueDate}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
                                                {task.priority}
                                            </Badge>
                                            <Badge variant={task.status === "Completed" ? "default" : task.status === "In Progress" ? "default" : "secondary"}>
                                                {task.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Activity Feed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {activityFeed.map((activity) => (
                                <div key={activity.id} className="flex items-center mb-4 last:mb-0">
                                    <div className="mr-4">
                                        {activity.type === "task_assigned" && <FileText className="h-8 w-8 text-blue-500" />}
                                        {activity.type === "comment" && <MessageSquare className="h-8 w-8 text-green-500" />}
                                        {activity.type === "status_update" && <CheckCircle2 className="h-8 w-8 text-yellow-500" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{activity.project}</p>
                                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="col-span-2 md:col-span-1">
                    <CardHeader>
                        <CardTitle>Meetings & Notices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px]">
                            {meetings.map((meeting) => (
                                <div key={meeting.id} className="flex items-center mb-4">
                                    <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                                    <div>
                                        <p className="font-semibold">{meeting.title}</p>
                                        <p className="text-sm text-muted-foreground">{meeting.date} at {meeting.time}</p>
                                    </div>
                                </div>
                            ))}
                            {notices.map((notice) => (
                                <div key={notice.id} className="flex items-center mb-4">
                                    {notice.type === "Success" ? (
                                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                                    ) : (
                                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                                    )}
                                    <div>
                                        <p className="font-semibold">{notice.title}</p>
                                        <p className="text-sm text-muted-foreground">{notice.date}</p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>



            <Collapsible
                open={expandedSections.teams}
                onOpenChange={() => toggleSection('teams')}
            >
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex w-full justify-between p-2">
                        <span className="text-lg font-semibold">My Teams</span>
                        {expandedSections.teams ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {teams.map((team) => (
                            <Card key={team.id}>
                                <CardHeader>
                                    <CardTitle>{team.name}</CardTitle>
                                    <CardDescription>{team.members} members</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-2" />
                                            <span className="font-semibold">{team.lead.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-4 w-4 mr-2" />
                                            <span>{team.lead.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <PhoneCall className="h-4 w-4 mr-2" />
                                            <span>{team.lead.phone}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <Collapsible
                open={expandedSections.invitations}
                onOpenChange={() => toggleSection('invitations')}
            >
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="flex w-full justify-between p-2">
                        <span className="text-lg font-semibold">Invitations & Approvals</span>
                        {expandedSections.invitations ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Card>
                        <CardContent className="p-4">
                            <ScrollArea className="h-[300px]">
                                {invitations.map((invitation) => (
                                    <div key={invitation.id} className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="font-semibold">{invitation.project}</h3>
                                            <p className="text-sm text-muted-foreground">Role: {invitation.role} | From: {invitation.from}</p>
                                        </div>
                                        <div>
                                            <Button size="sm" className="mr-2"><CheckSquare className="h-4 w-4 mr-1" /> Accept</Button>
                                            <Button size="sm" variant="outline"><XSquare className="h-4 w-4 mr-1" /> Decline</Button>
                                        </div>
                                    </div>
                                ))}
                                {approvals.map((approval) => (
                                    <div key={approval.id} className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="font-semibold">{approval.title}</h3>
                                            <p className="text-sm text-muted-foreground">{approval.type} - {approval.project} | By: {approval.requestedBy}</p>
                                        </div>
                                        <div>
                                            <Button size="sm" className="mr-2"><CheckSquare className="h-4 w-4 mr-1" /> Approve</Button>
                                            <Button size="sm" variant="outline"><XSquare className="h-4 w-4 mr-1" /> Reject</Button>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}