'use client'

import { useState, useEffect } from 'react'
import { TeamHeader, TeamHeaderSkeleton } from './components/TeamHeader'
import { TeamStats, TeamStatsSkeleton } from './components/TeamStats'
import { TaskList, TaskListSkeleton } from './components/TaskList'
import { MemberList, MemberListSkeleton } from './components/MemberList'
import { useParams } from 'next/navigation'


// Mock data fetching function (replace with actual API call)
const fetchTeamData = () => new Promise(resolve => {
    setTimeout(() => {
        resolve({
            id: "990f0daf-c9de-4f1b-b6be-c2b7e8465905",
            name: "Product Development Team",
            purpose: "The Product Development Team spearheads innovative projects to create, improve, and launch market-ready products. This involves conducting in-depth market research to identify customer needs, developing strategies to address those needs, and collaborating with various departments to ensure high-quality outcomes. The team's overarching goal is to drive the company's growth by consistently delivering value to customers and maintaining a competitive edge in the industry.",
            projectId: "b2ecf1d6-ae8f-4f3c-a0c9-b15b904f1351",
            createdAt: "2024-11-24T15:33:07.641Z",
            updatedAt: "2024-11-24T15:33:07.641Z",
            status: "ACTIVE",
            responsibilities: [
                "Conduct market research",
                "Develop product roadmaps",
                "Coordinate with cross-functional teams",
                "Ensure timely delivery of projects",
            ],
            leader: {
                id: "1",
                name: "John Doe",
                role: "Senior Product Manager",
                avatar: "/placeholder.svg?height=50&width=50"
            },
            stats: {
                totalMembers: 12,
                activeTasks: 8,
                completedTasks: 24,
                upcomingDeadlines: 3
            },
            members: [
                { id: "1", name: "John Doe", role: "Senior Product Manager", avatar: "/placeholder.svg?height=40&width=40" },
                { id: "2", name: "Jane Smith", role: "UX Designer", avatar: "/placeholder.svg?height=40&width=40" },
                { id: "3", name: "Mike Johnson", role: "Software Engineer", avatar: "/placeholder.svg?height=40&width=40" },
            ],
            tasks: [
                { id: "1", title: "Market Research for Product X", assignee: "Jane Smith", status: "In Progress", dueDate: "2024-12-15" },
                { id: "2", title: "Develop MVP for Product Y", assignee: "Mike Johnson", status: "Not Started", dueDate: "2025-01-10" },
                { id: "3", title: "User Testing for Product Z", assignee: "John Doe", status: "Completed", dueDate: "2024-11-30" },
            ]
        })
    }, 1500) // Simulate loading delay
})

export default function TeamDetailsPage() {
    const [teamData, setTeamData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams<{ teamId: string, projectId: string }>()



    return (
        <div className="container mx-auto p-6 space-y-8">
            <TeamHeader />
            <TeamStats />
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <TaskList />
                </div>
                <div>
                    <MemberList teamId={params.teamId} projectId={params.projectId}></MemberList>
                </div>
            </div>
        </div>
    )
}