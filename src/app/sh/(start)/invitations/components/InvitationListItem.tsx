'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Bell, Eye } from 'lucide-react'
import { format } from 'date-fns'
import Badge from "@/components/custom-ui/Badge"

export type Invitation = {
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
    invitedBy: string;
    createdAt: string;
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
            minUrl: string;
        } | null;
    };
    sentAt: string | null;
    seen: boolean;
    seenAt: string | null;
}

function InvitationListItem({ invitation, isSelected }: { invitation: Invitation; isSelected: boolean; }) {
    if (!invitation) {
        return null;
    }

    const inviterName = invitation.inviter?.name || 'Unknown';
    const projectTitle = invitation.project?.title || 'Untitled Project';
    const inviterProfilePicture = invitation.inviter?.profilePicture?.minUrl;

    return (
        <div
            className={`p-4 cursor-pointer transition-all duration-200 rounded-xl ${isSelected
                ? 'bg-iceMint-700 text-white shadow-md'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
        >
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className=" font-semibold truncate flex-1 mr-2" title={projectTitle}>
                        {projectTitle}
                    </h3>
                    <Badge
                        status={invitation.status === 'PENDING' ? 'pending' : invitation.status === 'ACCEPTED' ? 'active' : 'rejected'}
                        className="text-xs capitalize flex gap-1 w-fit items-center"
                    >
                        <span>{invitation.status.toLowerCase()}</span>
                        {!invitation.seen && (
                            <Bell className="h-3 w-3" />
                        )}
                    </Badge>
                </div>

                <div className="flex justify-between gap-4 items-end">
                    <div className="flex items-center space-x-3 ">
                        <Avatar className={`size-10 rounded-full border-2 ${isSelected?'border-white':'border-iceMint-200'}  shadow-sm`}>
                            <AvatarImage src={inviterProfilePicture} alt={inviterName} />
                            <AvatarFallback className="bg-iceMint-200 text-iceMint-700">
                                {inviterName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" title={inviterName}>
                                {inviterName}
                            </p>
                            <p className={`text-xs text-muted-foreground ${isSelected?'text-gray-100':'text-gray-400'}`}>
                                Inviter
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className={`flex flex-col items-center space-x-2 ${isSelected?'':'text-gray-500'}`}>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvitationListItem