'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Bell, FileText } from 'lucide-react'
import { format } from 'date-fns'
import Badge from "@/components/custom-ui/Badge"

type Invitation = {
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
    invitedBy: string;
    createdAt: Date;
    id: string;
    project: {
        status: string;
        id: string;
        title: string;
    };
    inviter: {
        id: string;
        email: string;
        name: string;
        profilePicture: {
            url: string;
        } | null;
    };
    sentAt: Date | null;
    seen: boolean;
    seenAt: Date | null;
}

function InvitationListItem({ invitation, isSelected, onClick }: { invitation: Invitation; isSelected: boolean; onClick: () => void }) {
    return (
        <div
            className={`p-2 cursor-pointer transition-colors rounded-2xl ${isSelected ? 'bg-iceMint-700 text-white' : 'hover:bg-accent/50'}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-2">
                    <h3 className="text-sm font-medium truncate" title={invitation.project.title}>
                        {invitation.project.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <Avatar className="h-4 w-4">
                            <AvatarImage src={invitation.inviter.profilePicture?.url} alt={invitation.inviter.name} />
                            <AvatarFallback>{invitation.inviter.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground truncate" title={invitation.inviter.name}>
                            {invitation.inviter.name}
                        </p>
                    </div>

                </div>
                <div className="flex flex-col justify-between items-end">
                    <div className="flex w-fit gap-1">
                        <Badge
                            status={invitation.status === 'PENDING' ? 'pending' : invitation.status === 'ACCEPTED' ? 'active' : 'rejected'}
                            className="text-xs"
                        >
                            {invitation.status.toLowerCase()}
                        </Badge>
                        {!invitation.seen && (
                            <Badge status="info">
                                <Bell className="mr-1 h-3 w-3" />
                                New
                            </Badge>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1 text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        {format(invitation.createdAt, 'MMM d, yyyy')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InvitationListItem