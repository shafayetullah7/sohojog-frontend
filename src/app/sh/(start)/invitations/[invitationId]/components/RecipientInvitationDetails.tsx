"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Users, Briefcase, ChevronDown, ChevronUp, XCircle, CheckCircle } from 'lucide-react'
import Badge from "@/components/custom-ui/Badge"
import { GetSingleInvitationResponse, Invitation } from "@/_lib/redux/api/api-features/roles/participant/invitation/dto/getSingleInvitation/response.dto"
import { useUpdateInvitationStatusMutation } from "@/_lib/redux/api/api-features/roles/participant/invitation/my.invitations.api"

type Props = {
    invitationId: string
}

export default function RecipientInvitationDetails({ invitation }: { invitation: Invitation }) {
    const [isProjectDescriptionExpanded, setIsProjectDescriptionExpanded] = useState(false);
    const [isInvitationMessageExpanded, setIsInvitationMessageExpanded] = useState(false);

    const [updateInvitationStatus, { isLoading }] = useUpdateInvitationStatusMutation();
    const handleAcceptInvitation = async () => {
        try {
            await updateInvitationStatus({
                params: { id: invitation.id },
                body: { status: "ACCEPTED" },
            }).unwrap();
            console.log("Invitation accepted successfully!");
        } catch (error) {
            console.error("Error accepting the invitation:", error);
        }
    };

    const handleDeclineInvitation = async () => {
        try {
            await updateInvitationStatus({
                params: { id: invitation.id },
                body: { status: "DECLINED" },
            }).unwrap();
            console.log("Invitation declined successfully!");
        } catch (error) {
            console.error("Error declining the invitation:", error);
        }
    };

    const truncateDescription = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    return (
        <div className="container mx-auto p-6 w-full">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">{invitation.project.title}</h1>

            <section className="mb-12">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-lg font-semibold text-gray-800">Project Overview</p>
                        <p className="text-sm text-gray-500">Created on {format(new Date(invitation.project.createdAt), 'PPP')}</p>
                    </div>
                    <Badge status="neutral">{invitation.project.status}</Badge>
                </div>

                <div className="mb-4">
                    <p className="mb-2 text-gray-700">
                        {isProjectDescriptionExpanded
                            ? invitation.project.description
                            : truncateDescription(invitation.project.description, 200)}
                    </p>
                    {invitation.project.description.length > 200 && (
                        <Button
                            variant="link"
                            onClick={() => setIsProjectDescriptionExpanded(!isProjectDescriptionExpanded)}
                            className="p-0 h-auto font-semibold text-gray-600 hover:text-gray-900"
                        >
                            {isProjectDescriptionExpanded ? 'See less' : 'See more'}
                        </Button>
                    )}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{invitation.project._count.participations} Participants</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600">
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
                            <p className="text-sm font-medium text-gray-800">{invitation.project.creator.name}</p>
                            <p className="text-xs text-gray-500">{invitation.project.creator.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Separator className="my-8" />

            <section>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-1 text-gray-900">You&apos;re Invited!</h2>
                        <p className="text-sm text-gray-500">Sent on {format(new Date(invitation.sentAt), 'PPP')}</p>
                    </div>
                    <Badge status={invitation.status === "PENDING" ? "pending" : invitation.status === "ACCEPTED" ? "success" : "rejected"}>
                        {invitation.status}
                    </Badge>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-medium text-gray-800">{invitation.invitedUserName}</p>
                            <p className="text-sm text-gray-500">{invitation.email}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Invited by</p>
                            <p className="font-medium text-gray-800">{invitation.inviter.name}</p>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                        <p className="mb-2 text-gray-700">
                            {isInvitationMessageExpanded
                                ? invitation.message
                                : truncateDescription(invitation.message, 150)}
                        </p>
                        {invitation.message.length > 150 && (
                            <Button
                                variant="link"
                                onClick={() => setIsInvitationMessageExpanded(!isInvitationMessageExpanded)}
                                className="p-0 h-auto font-semibold text-gray-600 hover:text-gray-900"
                            >
                                {isInvitationMessageExpanded ? 'See less' : 'See more'}
                            </Button>
                        )}
                    </div>
                </div>

                {invitation.status === 'PENDING' && (
                    <div className="flex space-x-4">
                        <button
                            className="flex-1 rounded-xl gradient-button flex items-center justify-center text-white font-semibold"
                            onClick={handleAcceptInvitation}
                            disabled={isLoading}
                        >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Accept Invitation
                        </button>
                        <button
                            className="flex-1 rounded-xl cancel-button flex items-center justify-center text-gray-700 font-semibold"
                            onClick={handleDeclineInvitation}
                            disabled={isLoading}
                        >
                            <XCircle className="w-5 h-5 mr-2" />
                            Decline
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}