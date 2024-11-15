'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Invitation = {
    id: string
    projectTitle: string
    invitedPerson: {
        name: string
        image: string
    }
    date: Date
    status: 'Pending' | 'Accepted' | 'Declined'
    description: string
    eventDate?: Date
    location?: string
    notes?: string
}

function InvitationListItem({ invitation, isSelected, onClick }: { invitation: Invitation; isSelected: boolean; onClick: () => void }) {
    return (
        <div
            className={`p-2 cursor-pointer transition-colors ${isSelected ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={invitation.invitedPerson.image} alt={invitation.invitedPerson.name} />
                        <AvatarFallback>{invitation.invitedPerson.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-medium">{invitation.projectTitle}</h3>
                        <p className="text-xs text-muted-foreground">{invitation.invitedPerson.name}</p>
                    </div>
                </div>
                <Badge
                    variant={invitation.status === 'Pending' ? 'default' : invitation.status === 'Accepted' ? 'default' : 'destructive'}
                    className="text-xs"
                >
                    {invitation.status}
                </Badge>
            </div>
        </div>
    )
}

export default InvitationListItem