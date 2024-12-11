'use client'

import { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useGetManagerTeamDetailsQuery } from '@/_lib/redux/api/api-features/roles/manager/manager-team/manager.team.api'
import { useParams } from 'next/navigation'

type TeamData = {
    name: string
    status: string
    purpose: string
    responsibilities: string[]
    leader: {
        name: string
        role: string
        avatar: string
    }
}

export function TeamHeader() {
    const [isExpanded, setIsExpanded] = useState(false);
    const params = useParams<{ teamId: string, projectId: string }>()
    const { data: response, isLoading: getTeamLoading, isError, error } = useGetManagerTeamDetailsQuery({ projectId: params.projectId, teamId: params.teamId })
    const [teamData, setTeamData] = useState<TeamData>({
        name: "Product Development Team",
        status: "ACTIVE",
        purpose: "The Product Development Team spearheads innovative projects to create, improve, and launch market-ready products. This involves conducting in-depth market research to identify customer needs, developing strategies to address those needs, and collaborating with various departments to ensure high-quality outcomes. The team's overarching goal is to drive the company's growth by consistently delivering value to customers and maintaining a competitive edge in the industry.",
        responsibilities: [
            "Conduct market research",
            "Develop product roadmaps",
            "Coordinate with cross-functional teams",
            "Ensure timely delivery of projects",
        ],
        leader: {
            name: "John Doe",
            role: "Senior Product Manager",
            avatar: "/placeholder.svg?height=50&width=50"
        }
    })

    if (getTeamLoading) {
        return <TeamHeaderSkeleton />
    }

    if (isError) {
        throw new Error("Failed to get team details")
    }


    if (response) {
        const teamData = response?.data?.team

        return (
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle className="text-3xl font-bold mb-2">{teamData.name}</CardTitle>
                            <Badge variant={teamData.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                {teamData.status}
                            </Badge>
                        </div>
                        {teamData.teamLeader && <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={teamData.teamLeader?.profilePicture} alt={teamData.teamLeader?.name} />
                                <AvatarFallback>{teamData.teamLeader.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold">{teamData.teamLeader.name}</h3>
                                {/* <p className="text-sm text-muted-foreground">{teamData.leader.role}</p> */}
                                <p className="text-sm text-muted-foreground">Team Leader</p>
                            </div>
                        </div>}
                        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? <ChevronUp /> : <ChevronDown />}
                        </Button>
                    </div>
                </CardHeader>
                {isExpanded && (
                    <CardContent>
                        <p className="text-sm mb-4">{teamData.purpose}</p>
                        <div className="flex flex-wrap gap-2">
                            {teamData.responsibilities.map((resp, index) => (
                                <Badge key={index} variant="outline">{resp}</Badge>
                            ))}
                        </div>
                    </CardContent>
                )}
            </Card>
        )
    }
}

export function TeamHeaderSkeleton() {
    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                        <div>
                            <div className="h-6 w-32 bg-gray-200 rounded mb-1"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                            <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}