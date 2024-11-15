'use client'

import { Mail, UserCheck, ClockIcon, UserMinus, Users, ChevronRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

// Mock data for demonstration
const stats = {
    total: 15,
    accepted: 8,
    pending: 5,
    declined: 2,
}

const frequentInviters = [
    { id: 1, name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', invitations: 5 },
    { id: 2, name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', invitations: 3 },
    { id: 3, name: 'Carol Davis', avatar: '/placeholder.svg?height=40&width=40', invitations: 2 },
    { id: 4, name: 'David Brown', avatar: '/placeholder.svg?height=40&width=40', invitations: 2 },
]


export default function InvitationsPage() {



    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-2">Invitation Overview</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Here you can review the invitations you&apos;ve received to join various exciting projects.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                        <Card className="col-span-full md:col-span-2 lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Total Invitations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-6xl font-bold mb-4">{stats.total}</div>
                                <Progress value={(stats.accepted / stats.total) * 100} className="h-2 mb-2" />
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                                        <span>Accepted ({stats.accepted})</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                                        <span>Pending ({stats.pending})</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 rounded-full bg-destructive mr-2"></div>
                                        <span>Declined ({stats.declined})</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                                <UserCheck className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.accepted}</div>
                                <p className="text-xs text-muted-foreground">
                                    {((stats.accepted / stats.total) * 100).toFixed(1)}% of total
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.pending}</div>
                                <p className="text-xs text-muted-foreground">
                                    {((stats.pending / stats.total) * 100).toFixed(1)}% of total
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Declined</CardTitle>
                                <UserMinus className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.declined}</div>
                                <p className="text-xs text-muted-foreground">
                                    {((stats.declined / stats.total) * 100).toFixed(1)}% of total
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Invitation Rate</CardTitle>
                                <Mail className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{(stats.total / 30).toFixed(1)}</div>
                                <p className="text-xs text-muted-foreground">Invitations per day (last 30 days)</p>
                            </CardContent>
                        </Card>
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <Users className="mr-2 h-6 w-6" />
                        Frequently Inviting Users
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {frequentInviters.map((user) => (
                            <Card key={user.id}>
                                <CardContent className="flex items-center space-x-4 py-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.invitations} Invitations</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}