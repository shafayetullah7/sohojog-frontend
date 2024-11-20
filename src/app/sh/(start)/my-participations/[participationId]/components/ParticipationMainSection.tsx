import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Briefcase, Calendar, Clock, FileText, User, Users } from "lucide-react";
import { useState } from "react";


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

const ParticipationMainSection = () => {

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
        <div className="flex-grow p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">User Dashboard</h1>

            <Card className="shadow-sm">
                <CardHeader className="p-4">
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Briefcase className="mr-2 h-5 w-5" />
                        {selectedProject.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="tasks" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 p-1">
                            <TabsTrigger value="tasks" className="text-sm"><FileText className="mr-1 h-4 w-4" /> Tasks</TabsTrigger>
                            <TabsTrigger value="notices" className="text-sm"><Bell className="mr-1 h-4 w-4" /> Notices</TabsTrigger>
                            <TabsTrigger value="meetings" className="text-sm"><Users className="mr-1 h-4 w-4" /> Meetings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tasks">
                            <ScrollArea className="h-[calc(100vh-200px)]">
                                <div className="space-y-2 p-4">
                                    {tasks.map((task) => (
                                        <Card key={task.id} className="hover:shadow-sm transition-shadow">
                                            <CardContent className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-semibold text-sm text-gray-900">{task.title}</h3>
                                                    <Badge variant={task.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                                                        {task.priority}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                                    <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> {task.dueDate}</span>
                                                    <span className="flex items-center"><User className="mr-1 h-3 w-3" /> {task.assignedBy}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="notices">
                            <ScrollArea className="h-[calc(100vh-200px)]">
                                <div className="space-y-2 p-4">
                                    {notices.map((notice) => (
                                        <Card key={notice.id} className="hover:shadow-sm transition-shadow">
                                            <CardContent className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-semibold text-sm text-gray-900">{notice.title}</h3>
                                                    <Badge variant={notice.type === "Warning" ? "destructive" : "secondary"} className="text-xs">
                                                        {notice.type}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                                    <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> {notice.date}</span>
                                                    <span className="flex items-center"><User className="mr-1 h-3 w-3" /> {notice.postedBy}</span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="meetings">
                            <ScrollArea className="h-[calc(100vh-200px)]">
                                <div className="space-y-2 p-4">
                                    {meetings.map((meeting) => (
                                        <Card key={meeting.id} className="hover:shadow-sm transition-shadow">
                                            <CardContent className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="font-semibold text-sm text-gray-900">{meeting.title}</h3>
                                                    <Badge variant="outline" className="text-xs">
                                                        <Clock className="mr-1 h-3 w-3" />
                                                        {meeting.time}
                                                    </Badge>
                                                </div>
                                                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                                    <span className="flex items-center"><Calendar className="mr-1 h-3 w-3" /> {meeting.date}</span>
                                                    <span className="flex items-center"><User className="mr-1 h-3 w-3" /> {meeting.organizer}</span>
                                                </div>
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
    );
};

export default ParticipationMainSection;