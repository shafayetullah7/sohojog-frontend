"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Users, Briefcase, Plus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Team {
    id: string
    name: string
    createdAt: Date
    participantsCount: number
    recentMembers: { name: string; avatar: string }[]
    tasksCompleted: number
}

const mockTeams: Team[] = [
    {
        id: "1",
        name: "Design Team",
        createdAt: new Date(2023, 0, 1),
        participantsCount: 8,
        recentMembers: [
            { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Charlie", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        tasksCompleted: 24
    },
    {
        id: "2",
        name: "Development Team",
        createdAt: new Date(2023, 1, 15),
        participantsCount: 12,
        recentMembers: [
            { name: "David", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Eve", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Frank", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        tasksCompleted: 37
    },
    {
        id: "3",
        name: "Marketing Team",
        createdAt: new Date(2023, 2, 10),
        participantsCount: 6,
        recentMembers: [
            { name: "Grace", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Henry", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        tasksCompleted: 18
    },
    {
        id: "4",
        name: "Sales Team",
        createdAt: new Date(2023, 3, 5),
        participantsCount: 10,
        recentMembers: [
            { name: "Ivy", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Jack", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Kate", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        tasksCompleted: 42
    },
    {
        id: "5",
        name: "Support Team",
        createdAt: new Date(2023, 4, 20),
        participantsCount: 7,
        recentMembers: [
            { name: "Liam", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Mia", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        tasksCompleted: 31
    },
]

export default function MyProjectTeams() {
    const [teams] = useState<Team[]>(mockTeams)

    return (
        <Card className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 border-none text-gray-800 rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-white/40 backdrop-blur-sm">
                <CardTitle className="text-2xl font-bold text-indigo-900">Teams</CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/60 text-indigo-700 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                >
                    See All
                </Button>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {teams.slice(0, 3).map((team) => (
                        <div
                            key={`grid-${team.id}`}
                            className="flex flex-col items-center justify-center p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all cursor-pointer shadow-md"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 mb-2">
                                <Briefcase className="h-6 w-6 text-indigo-600" />
                            </div>
                            <p className="text-sm font-medium text-center truncate w-full text-indigo-900">{team.name}</p>
                            <p className="text-xs text-indigo-600">{team.participantsCount} members</p>
                        </div>
                    ))}
                </div>
                <ScrollArea className="h-[250px] pr-4">
                    <ul className="space-y-3">
                        {teams.map((team) => (
                            <li
                                key={`list-${team.id}`}
                                className="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all shadow-sm hover:shadow-md"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 shrink-0">
                                    <Briefcase className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-indigo-900 truncate">{team.name}</p>
                                        <ChevronRight className="h-4 w-4 text-indigo-400" />
                                    </div>
                                    <p className="text-xs text-indigo-600 mb-2">
                                        Created {format(team.createdAt, "MMM d, yyyy")}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {team.recentMembers.map((member, index) => (
                                                <Avatar key={index} className="inline-block border-2 border-white w-6 h-6">
                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                            {team.participantsCount > 3 && (
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium border-2 border-white">
                                                    +{team.participantsCount - 3}
                                                </div>
                                            )}
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="bg-indigo-100 text-indigo-700 border-indigo-200"
                                        >
                                            <Users className="h-3 w-3 mr-1" />
                                            {team.tasksCompleted} tasks
                                        </Badge>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                    <Plus className="h-4 w-4 mr-2" /> Create New Team
                </Button>
            </CardContent>
        </Card>
    )
}