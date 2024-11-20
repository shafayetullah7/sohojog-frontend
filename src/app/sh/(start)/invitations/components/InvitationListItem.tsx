'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Bell, Eye } from 'lucide-react'
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
    if (!invitation) {
        return null;
    }

    const inviterName = invitation.inviter?.name || 'Unknown';
    const projectTitle = invitation.project?.title || 'Untitled Project';
    const inviterProfilePicture = invitation.inviter?.profilePicture?.url;

    return (
        <div
            className={`p-4 cursor-pointer transition-all duration-200 rounded-xl ${
                isSelected 
                    ? 'bg-iceMint-700 text-white shadow-md' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={onClick}
        >
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold truncate flex-1 mr-2" title={projectTitle}>
                        {projectTitle}
                    </h3>
                    <Badge
                        status={invitation.status === 'PENDING' ? 'pending' : invitation.status === 'ACCEPTED' ? 'active' : 'rejected'}
                        className="text-xs capitalize"
                    >
                        {invitation.status.toLowerCase()}
                    </Badge>
                </div>
                
                <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 rounded-full border-2 border-white shadow-sm">
                        <AvatarImage src={inviterProfilePicture} alt={inviterName} />
                        <AvatarFallback className="bg-iceMint-200 text-iceMint-700">
                            {inviterName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" title={inviterName}>
                            {inviterName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Inviter
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <span className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {invitation.sentAt ? format(invitation.sentAt, 'MMM d, yyyy') : 'Date unknown'}
                        </span>
                        {invitation.seen && (
                            <span className="flex items-center" title="Seen">
                                <Eye className="mr-1 h-3 w-3" />
                                {invitation.seenAt ? format(invitation.seenAt, 'MMM d, yyyy') : 'Seen'}
                            </span>
                        )}
                    </div>
                    {!invitation.seen && (
                        <Badge status="info" className="text-xs">
                            <Bell className="mr-1 h-3 w-3" />
                            New
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    )
}

export default InvitationListItem