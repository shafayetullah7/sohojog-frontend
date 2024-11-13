"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { ArrowRight, UserPlus } from "lucide-react"
import InviteForm from "./InviteForm"
import { useGetManagerProjectQuery, useGetManagerSingleProjectParticipansQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi"
import { useParams } from "next/navigation"

// Mock data for participants
const mockParticipants = [
    { id: "1", user: { name: "Alice Johnson", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-01-15T00:00:00Z" },
    { id: "2", user: { name: "Bob Smith", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-02-20T00:00:00Z" },
    { id: "3", user: { name: "Charlie Brown", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-03-10T00:00:00Z" },
]

export default function MyProjectParticipants() {
    const [participants, setParticipants] = useState(mockParticipants)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { toast } = useToast();

    const params = useParams();
    const projectId = params.projectId as string;

    const { data, isError, isFetching, isLoading, error } = useGetManagerSingleProjectParticipansQuery({ projectId })


    const LoadingState = () => (
        <Card className="w-full bg-lavender-blush-50-tr-bl border-none text-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Participants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-6 overflow-x-auto py-2">
                    {[...Array(5)].map((_, idx) => (
                        <Skeleton key={`avatar-${idx}`} className="w-12 h-12 rounded-full bg-gray-200/40 flex-shrink-0" />
                    ))}
                </div>
                <ScrollArea className="h-[300px] pr-4">
                    <ul className="space-y-3">
                        {[...Array(5)].map((_, idx) => (
                            <li key={idx} className="flex items-center space-x-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                                <Skeleton className="w-12 h-12 rounded-full bg-gray-200/40" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4 bg-gray-200/40" />
                                    <Skeleton className="h-3 w-1/2 bg-gray-200/40" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )

    if (isLoading) {
        return <LoadingState />
    }

    if (!data?.data.participants) {

    } else {
        const { participants } = data.data;
        return (
            <Card className="w-full bg-lavender-blush-50-tr-bl border-none text-gray-800 rounded-2xl border-2 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 backdrop-blur-sm">
                    <CardTitle className="text-2xl font-bold">Participants</CardTitle>
                    <button
                        className=" text-sm bg-transparent text-gray-400 hover:text-gray-700 transition-all duration-300 rounded-xl"
                    >
                        <span className="flex items-center gap-2 font-medium ">See All
                            <ArrowRight className="size-4"></ArrowRight></span>
                    </button>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-6 overflow-x-auto py-2">
                        {participants.slice(0, 5).map((participant) => (
                            <Avatar key={participant.id} className="w-12 h-12 border-2 border-white">
                                <AvatarImage src={participant.user.profilePicture.minUrl} alt={participant.user.name} />
                                <AvatarFallback>{participant.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <ScrollArea className="h-[250px] pr-4">
                        <ul className="space-y-3">
                            {participants.map((participant) => (
                                <li
                                    key={participant.id}
                                    className="flex items-center space-x-4 px-4 py-3 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all cursor-pointer"
                                >
                                    <Avatar className="w-12 h-12 border-2 border-blushPink-200">
                                        <AvatarImage src={participant.user.profilePicture.minUrl} alt={participant.user.name} />
                                        <AvatarFallback>{participant.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-semibold text-gray-800">{participant.user.name}</p>
                                        <p className="text-xs text-gray-600">Joined {format(new Date(participant.joinedAt), "MMM d, yyyy")}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        variant="outline"
                        size="sm"
                        className="bg-white text-gray-700 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl px-6 border-white shadow-sm"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite Participants
                    </Button>
                    <InviteForm isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} projectId={projectId} />
                </CardFooter>
            </Card>
        )
    }
}
