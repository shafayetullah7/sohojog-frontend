"use client"

import React, { useState } from 'react'
import { format } from 'date-fns'
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Message = {
    id: string
    content: string
    sender: string
    avatar: string
    timestamp: Date
    isCurrentUser: boolean
}

type Member = {
    id: string
    name: string
    avatar: string
    isOnline: boolean
}

const messages: Message[] = [
    { id: '1', content: "Hey team, how's the project coming along?", sender: "Alice", avatar: "/avatars/alice.jpg", timestamp: new Date(2023, 5, 15, 10, 30), isCurrentUser: false },
    { id: '2', content: "We're making good progress. The design phase is almost complete.", sender: "Bob", avatar: "/avatars/bob.jpg", timestamp: new Date(2023, 5, 15, 10, 32), isCurrentUser: true },
    { id: '3', content: "Great to hear! When do you think we can start the development phase?", sender: "Alice", avatar: "/avatars/alice.jpg", timestamp: new Date(2023, 5, 15, 10, 35), isCurrentUser: false },
    { id: '4', content: "We should be ready to start development by next week.", sender: "Charlie", avatar: "/avatars/charlie.jpg", timestamp: new Date(2023, 5, 15, 10, 37), isCurrentUser: false },
    { id: '5', content: "Sounds good. Let's schedule a meeting to discuss the details.", sender: "Bob", avatar: "/avatars/bob.jpg", timestamp: new Date(2023, 5, 15, 10, 40), isCurrentUser: true },
]

const members: Member[] = [
    { id: '1', name: "Alice Johnson", avatar: "/avatars/alice.jpg", isOnline: true },
    { id: '2', name: "Bob Smith", avatar: "/avatars/bob.jpg", isOnline: true },
    { id: '3', name: "Charlie Brown", avatar: "/avatars/charlie.jpg", isOnline: false },
    { id: '4', name: "David Lee", avatar: "/avatars/david.jpg", isOnline: true },
]

export default function GroupChat() {
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMessage.trim() !== '') {
            // Here you would typically send the message to your backend
            console.log('Sending message:', newMessage)
            setNewMessage('')
        }
    }

    return (
        <TooltipProvider>
            <div className="flex flex-col h-full w-full  rounded-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src="/avatars/project-team.jpg" alt="Project Team" />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold">Project Team</h2>
                            <p className="text-sm text-muted-foreground">4 members</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <Phone className="h-5 w-5" />
                            <span className="sr-only">Start audio call</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Video className="h-5 w-5" />
                            <span className="sr-only">Start video call</span>
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Users className="h-5 w-5" />
                                    <span className="sr-only">View members</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Group Members</DialogTitle>
                                    <DialogDescription>
                                        Members of the Project Team chat
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    {members.map((member) => (
                                        <div key={member.id} className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={member.avatar} alt={member.name} />
                                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {member.isOnline ? 'Online' : 'Offline'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                    <span className="sr-only">More options</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                                <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                                <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Leave chat</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'} items-start space-x-2`}
                            >
                                {!message.isCurrentUser && (

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar className="w-8 h-8 cursor-default">
                                                <AvatarImage src={message.avatar} alt={message.sender} />
                                                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent side={message.isCurrentUser ? "left" : "right"}>
                                            <p className="text-sm font-medium cursor-pointer">{message.sender}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                <div className={`max-w-[70%] ${message.isCurrentUser ? 'bg-iceMint-500 text-white' : 'bg-muted bg-gray-100'} rounded-lg px-3 py-2 `}>
                                    <p>{message.content}</p>
                                    <p className="text-xs text-right mt-1 opacity-70">
                                        {format(message.timestamp, 'HH:mm')}
                                    </p>
                                </div>
                                {message.isCurrentUser && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={message.avatar} alt={message.sender} />
                                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="border-t p-4 flex items-center space-x-2">
                    <Button type="button" variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Attach file</span>
                    </Button>
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="button" variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                        <span className="sr-only">Insert emoji</span>
                    </Button>
                    <Button type="submit" size="icon">
                        <Send className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </div>
        </TooltipProvider>
    )
}

