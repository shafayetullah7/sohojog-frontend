"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Search, X, Mail, Plus } from "lucide-react"
import InviteForm from "./InviteForm"

// Mock data for participants
const mockParticipants = [
    { id: "1", user: { name: "Alice Johnson", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-01-15T00:00:00Z" },
    { id: "2", user: { name: "Bob Smith", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-02-20T00:00:00Z" },
    { id: "3", user: { name: "Charlie Brown", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-03-10T00:00:00Z" },
    { id: "4", user: { name: "Diana Prince", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-04-05T00:00:00Z" },
    { id: "5", user: { name: "Ethan Hunt", profilePicture: { minUrl: "/placeholder.svg?height=40&width=40" } }, joinedAt: "2023-05-20T00:00:00Z" },
]

// Mock function for user search
const searchUsers = async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
        { id: "3", name: "Alice Johnson", email: "alice@example.com" },
    ].filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    )
}

export default function MyProjectParticipants() {
    const params = useParams()
    const projectId = params.projectId as string
    const [participants, setParticipants] = useState<typeof mockParticipants>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Array<{ id: string; name: string; email: string }>>([])
    const [selectedUsers, setSelectedUsers] = useState<Array<{ id: string; name: string; email: string }>>([])
    const [inviteEmails, setInviteEmails] = useState<string[]>([])
    const [newEmail, setNewEmail] = useState("")
    const [inviteSubject, setInviteSubject] = useState("")
    const [inviteMessage, setInviteMessage] = useState("")
    const { toast } = useToast()

    useEffect(() => {
        const fetchParticipants = async () => {
            setIsLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                setParticipants(mockParticipants)
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching participants:", error)
                setIsError(true)
                setIsLoading(false)
            }
        }

        fetchParticipants()
    }, [projectId])

    const handleSearch = async () => {
        const results = await searchUsers(searchQuery)
        setSearchResults(results.filter(user => !selectedUsers.some(selected => selected.id === user.id)))
    }

    const handleSelectUser = (user: { id: string; name: string; email: string }) => {
        setSelectedUsers(prev => [...prev, user])
        setSearchResults(prev => prev.filter(u => u.id !== user.id))
    }

    const handleRemoveUser = (userId: string) => {
        const removedUser = selectedUsers.find(user => user.id === userId)
        setSelectedUsers(prev => prev.filter(u => u.id !== userId))
        if (removedUser) {
            setSearchResults(prev => [...prev, removedUser])
        }
    }

    const handleAddEmail = () => {
        if (newEmail && !inviteEmails.includes(newEmail)) {
            setInviteEmails(prev => [...prev, newEmail])
            setNewEmail("")
        }
    }

    const handleRemoveEmail = (email: string) => {
        setInviteEmails(prev => prev.filter(e => e !== email))
    }

    const handleSendInvitations = (type: 'users' | 'emails') => {
        if (type === 'users') {
            toast({
                title: "Invitations Sent",
                description: `Sent invitations to ${selectedUsers.length} users.`,
            })
            setSelectedUsers([])
        } else {
            toast({
                title: "Email Invitations Sent",
                description: `Sent invitations to ${inviteEmails.length} email addresses.`,
            })
            setInviteEmails([])
        }
        setInviteSubject("")
        setInviteMessage("")
        setIsDialogOpen(false)
    }

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

    if (isError) {
        return (
            <Card className="w-full bg-red-100 border-none text-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-[300px]">
                        <p className="text-center font-medium text-gray-800">Error loading participants</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full bg-lavender-blush-50-tr-bl border-none text-gray-800 rounded-2xl border-2 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 backdrop-blur-sm">
                <CardTitle className="text-2xl font-bold">Participants</CardTitle>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/40 text-gray-600 border-white/60 hover:bg-white/60 hover:text-gray-800 transition-colors rounded-xl"
                >
                    See All
                </Button>

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
                <ScrollArea className="h-[300px] pr-4">
                    <ul className="space-y-3">
                        {participants.map((participant) => (
                            <li
                                key={participant.id}
                                className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all cursor-pointer"
                            >
                                <Avatar className="w-12 h-12 border-2 border-white">
                                    <AvatarImage src={participant.user.profilePicture.minUrl} alt={participant.user.name} />
                                    <AvatarFallback>{participant.user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {participant.user.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Joined {format(new Date(participant.joinedAt), "MMM d, yyyy")}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 text-gray-800 backdrop-blur-sm hover:bg-white/20 transition-colors"
                        >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Invite Participants
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Invite Participants</DialogTitle>
                            <DialogDescription>Search for users or send email invitations.</DialogDescription>
                        </DialogHeader>
                        <InviteForm />
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}