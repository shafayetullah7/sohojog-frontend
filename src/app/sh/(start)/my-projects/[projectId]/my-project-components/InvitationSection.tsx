'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight } from 'lucide-react'

const invitations = [
    { id: 1, user: "Alice Smith", status: "Accepted", date: "2023-05-19", avatar: "/avatars/alice.jpg" },
    { id: 2, user: "Bob Johnson", status: "Pending", date: "2023-05-20", avatar: "/avatars/bob.jpg" },
    { id: 3, user: "Charlie Brown", status: "Rejected", date: "2023-05-21", avatar: "/avatars/charlie.jpg" },
]

export function InvitationsSection() {
    return (
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
            <CardHeader className="bg-iceMint-200 py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                    <span>Latest Invitations</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                        See All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-200">
                    {invitations.map(invitation => (
                        <li key={invitation.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Avatar className="w-8 h-8 mr-3">
                                        <AvatarImage src={invitation.avatar} alt={invitation.user} />
                                        <AvatarFallback>{invitation.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{invitation.user}</p>
                                        <p className="text-xs text-gray-500">{invitation.date}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant={invitation.status === 'Accepted' ? 'default' : invitation.status === 'Pending' ? 'default' : 'destructive'}
                                    className="text-xs"
                                >
                                    {invitation.status}
                                </Badge>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}