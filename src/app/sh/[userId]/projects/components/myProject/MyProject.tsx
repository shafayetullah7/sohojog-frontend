"use client"

import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarIcon, UsersIcon, CheckSquareIcon, ArrowRightIcon } from "lucide-react"

const statusColors = {
    PLANNING: "bg-blue-100 text-blue-800",
    ON_HOLD: "bg-yellow-100 text-yellow-800",
    ONGOING: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-100 text-gray-800",
}

const priorityColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
}

export default function ProjectCardDemo() {
    const project = {
        id: "1",
        title: "Website Redesign Project",
        description: "Redesign the company's main website to improve user experience and increase conversions.",
        status: "ONGOING",
        startDate: "2024-10-04T00:00:00.000Z",
        endDate: "2024-12-31T00:00:00.000Z",
        visibility: "PRIVATE",
        priority: "HIGH",
        tags: ["redesign", "website", "UX", "frontend"],
        _count: {
            participations: 5,
            tasks: 23,
        },
        participations: [
            {
                id: "1",
                user: {
                    id: "1",
                    name: "John Doe",
                    profilePicture: null,
                },
            },
        ],
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                        {project.status}
                    </Badge>
                </div>
                <CardDescription className="mt-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>
                            {format(new Date(project.startDate), "MMM d, yyyy")} - {format(new Date(project.endDate), "MMM d, yyyy")}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <UsersIcon className="h-4 w-4 mr-2" />
                        <span>{project._count.participations} participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <CheckSquareIcon className="h-4 w-4 mr-2" />
                        <span>{project._count.tasks} tasks</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                        {project.priority}
                    </Badge>
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={project.participations[0].user.profilePicture || undefined} />
                        <AvatarFallback>{project.participations[0].user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                <Button variant="outline" size="sm">
                    View Project <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}