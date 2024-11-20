"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, Briefcase, ChevronDown, ChevronUp, XCircle, CheckCircle } from 'lucide-react'
import Badge from "@/components/custom-ui/Badge"

// The invitation data provided
const invitation = {
    id: "7b4fbc2b-b2fb-4a04-aabf-3c7465df8a9d",
    email: "johndoe@example.com",
    projectId: "b2ecf1d6-ae8f-4f3c-a0c9-b15b904f1351",
    status: "PENDING",
    invitedUserName: "John Doe",
    message: "We'd love to have you join our exciting new project! " + "Exciting details ahead! ".repeat(50),
    invitedBy: "416a60fb-0455-48b1-a0a1-397cbebebb5e",
    sentAt: "2024-11-13T02:27:33.877Z",
    actionedAt: null,
    seen: false,
    seenAt: null,
    createdAt: "2024-11-13T01:13:27.241Z",
    updatedAt: "2024-11-13T02:27:33.873Z",
    inviter: {
        email: "janesmith@example.com",
        id: "416a60fb-0455-48b1-a0a1-397cbebebb5e",
        profilePicture: {
            minUrl: "https://i.pravatar.cc/150?img=1",
            midUrl: "https://i.pravatar.cc/300?img=1"
        },
        name: "Jane Smith"
    },
    project: {
        id: "b2ecf1d6-ae8f-4f3c-a0c9-b15b904f1351",
        title: "Next-Gen Web Application",
        createdAt: "2024-10-24T01:34:27.131Z",
        description: "Developing a cutting-edge web application " + "using the latest technologies. ".repeat(50),
        status: "IN_PROGRESS",
        _count: {
            participations: 5,
            teams: 2
        },
        creator: {
            name: "Jane Smith",
            email: "janesmith@example.com",
            profilePicture: {
                midUrl: "https://i.pravatar.cc/300?img=1",
                minUrl: "https://i.pravatar.cc/150?img=1"
            }
        }
    }
}

type Props = {
    invitationId: string
}

export default function ProjectInvitation({ invitationId }: Props) {
    const [isProjectDescriptionExpanded, setIsProjectDescriptionExpanded] = useState(false)
    const [isInvitationMessageExpanded, setIsInvitationMessageExpanded] = useState(false)

    const truncateDescription = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    return (
        <div className="container mx-auto p-6 w-full">
            <h1 className="text-2xl font-bold mb-8">{invitation.project.title}</h1>

            <section className="mb-12">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-lg font-semibold">Project Overview</p>
                        <p className="text-sm text-muted-foreground">Created on {format(new Date(invitation.project.createdAt), 'PPP')}</p>
                    </div>
                    <Badge status="neutral">{invitation.project.status}</Badge>
                </div>

                <div className="mb-4">
                    <p className="mb-2">
                        {isProjectDescriptionExpanded
                            ? invitation.project.description
                            : truncateDescription(invitation.project.description, 200)}
                    </p>
                    {invitation.project.description.length > 200 && (
                        <Button
                            variant="link"
                            onClick={() => setIsProjectDescriptionExpanded(!isProjectDescriptionExpanded)}
                            className="p-0 h-auto font-semibold"
                        >
                            {isProjectDescriptionExpanded ? 'See less' : 'See more'}
                        </Button>
                    )}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{invitation.project._count.participations} Participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{invitation.project._count.teams} Teams</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={invitation.project.creator.profilePicture.minUrl} alt={invitation.project.creator.name} />
                            <AvatarFallback>{invitation.project.creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{invitation.project.creator.name}</p>
                            <p className="text-xs text-muted-foreground">{invitation.project.creator.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="my-8" />

            <section>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">You&apos;re Invited!</h2>
                        <p className="text-sm text-muted-foreground">Sent on {format(new Date(invitation.sentAt), 'PPP')}</p>
                    </div>
                    <Badge status={invitation.status === "PENDING" ? "pending" : invitation.status === "ACCEPTED" ? "success" : "rejected"}>
                        {invitation.status}
                    </Badge>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-medium">{invitation.invitedUserName}</p>
                            <p className="text-sm text-muted-foreground">{invitation.email}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm">Invited by</p>
                            <p className="font-medium">{invitation.inviter.name}</p>
                        </div>
                    </div>

                    <div className="bg-muted p-4 rounded-md mb-4">
                        <p className="mb-2">
                            {isInvitationMessageExpanded
                                ? invitation.message
                                : truncateDescription(invitation.message, 150)}
                        </p>
                        {invitation.message.length > 150 && (
                            <Button
                                variant="link"
                                onClick={() => setIsInvitationMessageExpanded(!isInvitationMessageExpanded)}
                                className="p-0 h-auto font-semibold"
                            >
                                {isInvitationMessageExpanded ? 'See less' : 'See more'}
                            </Button>
                        )}
                    </div>
                </div>


                <div className="flex space-x-4">
                    <button className="flex-1 rounded-xl gradient-button flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Accept Invitation
                    </button>
                    <button className="flex-1 rounded-xl cancel-button flex items-center justify-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        Decline
                    </button>
                </div>
            </section>
        </div>
    )
}