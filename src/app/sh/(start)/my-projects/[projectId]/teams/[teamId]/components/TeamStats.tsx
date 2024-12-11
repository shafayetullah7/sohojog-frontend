'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CheckSquare, Calendar } from 'lucide-react'

type TeamStatsData = {
    totalMembers: number
    activeTasks: number
    completedTasks: number
    upcomingDeadlines: number
}

export function TeamStats() {
    const [stats, setStats] = useState<TeamStatsData>({
        totalMembers: 12,
        activeTasks: 8,
        completedTasks: 24,
        upcomingDeadlines: 3
    })

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalMembers}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.activeTasks}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                    <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.completedTasks}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.upcomingDeadlines}</div>
                </CardContent>
            </Card>
        </div>
    )
}

export function TeamStatsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}