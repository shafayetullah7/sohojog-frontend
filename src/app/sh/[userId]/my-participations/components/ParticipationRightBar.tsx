import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { Bell, Briefcase, Calendar, CheckCircle, FileText, Mail, Trash2, User, X, XCircle } from "lucide-react";
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

const ParticipationRightBar = () => {

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
        <div className="w-full bg-gray-50 p-4 overflow-y-auto">
            <Card className="shadow-sm">
                <CardHeader className="p-3">
                    <CardTitle className="text-lg text-gray-900">Projects & Invitations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="projects" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 p-1">
                            <TabsTrigger value="projects" className="text-xs"><Briefcase className="mr-1 h-3 w-3" /> Projects</TabsTrigger>
                            <TabsTrigger value="invitations" className="text-xs"><Mail className="mr-1 h-3 w-3" /> Invitations</TabsTrigger>
                        </TabsList>
                        <TabsContent value="projects" className="p-2">
                            <ScrollArea className="h-[calc(100vh-180px)]">
                                <div className="space-y-2">
                                    {projects.map((project) => (
                                        <Card
                                            key={project.id}
                                            className={`cursor-pointer transition-all hover:shadow-sm ${selectedProject?.id === project.id ? "bg-blue-50" : ""
                                                }`}
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            <CardContent className="p-3">
                                                <h3 className="font-semibold text-sm text-gray-900">{project.name}</h3>
                                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                                    <Avatar className="h-4 w-4 mr-1">
                                                        <AvatarImage src={project.createdBy.image} alt={project.createdBy.name} />
                                                        <AvatarFallback>{project.createdBy.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span>{project.createdBy.name}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                                    <Calendar className="mr-1 h-3 w-3" />
                                                    {project.createdAt}
                                                </p>
                                                <div className="flex space-x-1 mt-1">
                                                    {project.newTasks > 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            <FileText className="mr-1 h-2 w-2" />
                                                            {project.newTasks}
                                                        </Badge>
                                                    )}
                                                    {project.newNotices > 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            <Bell className="mr-1 h-2 w-2" />
                                                            {project.newNotices}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="invitations" className="p-2">
                            <Select onValueChange={setInvitationFilter} defaultValue="all">
                                <SelectTrigger className="w-full mb-2">
                                    <SelectValue placeholder="Filter invitations" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="new">Pending</SelectItem>
                                    <SelectItem value="accepted">Accepted</SelectItem>
                                    <SelectItem value="declined">Declined</SelectItem>
                                </SelectContent>
                            </Select>
                            <ScrollArea className="h-[calc(100vh-220px)]">
                                <div className="space-y-2">
                                    {filteredInvitations.map((invitation) => (
                                        <Card key={invitation.id} className="hover:shadow-sm transition-shadow">
                                            <CardContent className="p-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className="font-semibold text-sm text-gray-900">{invitation.projectName}</h3>
                                                    {invitation.status === "new" ? (
                                                        <div className="flex space-x-1">
                                                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={() => handleInvitationAction(invitation.id, 'accept')}>
                                                                <CheckBadgeIcon className="h-3 w-3 text-green-500" />
                                                            </Button>
                                                            <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={() => handleInvitationAction(invitation.id, 'decline')}>
                                                                <X className="h-3 w-3 text-red-500" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button size="sm" variant="outline" className="h-6 w-6 p-0" onClick={() => handleInvitationAction(invitation.id, 'delete')}>
                                                            <Trash2 className="h-3 w-3 text-gray-500" />
                                                        </Button>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    <User className="mr-1 h-3 w-3" />
                                                    {invitation.invitedBy}
                                                </p>
                                                <p className="text-xs text-gray-500 flex items-center mt-1">
                                                    <Calendar className="mr-1 h-3 w-3" />
                                                    {invitation.date}
                                                </p>
                                                <Badge
                                                    variant={invitation.status === "new" ? "secondary" : invitation.status === "accepted" ? "default" : "destructive"}
                                                    className="mt-1 text-xs"
                                                >
                                                    {invitation.status === "new" && <Bell className="mr-1 h-2 w-2" />}
                                                    {invitation.status === "accepted" && <CheckCircle className="mr-1 h-2 w-2" />}
                                                    {invitation.status === "declined" && <XCircle className="mr-1 h-2 w-2" />}
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
    );
};

export default ParticipationRightBar