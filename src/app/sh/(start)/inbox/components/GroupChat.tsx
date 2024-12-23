"use client"

import React, { useState, useRef } from 'react'
import { format } from 'date-fns'
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, Users, X } from 'lucide-react'
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
import { toast } from "@/components/ui/use-toast"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import Image from 'next/image'

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

type SelectedFile = {
    file: File
    preview?: string
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

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];

export default function GroupChat() {
    const [newMessage, setNewMessage] = useState('')
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isFileAllowed = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase();
        return extension && ALLOWED_FILE_TYPES.includes(extension);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newSelectedFiles = files.filter(file => {
            if (!isFileAllowed(file)) {
                toast({
                    title: "Invalid file format",
                    description: `File "${file.name}" is not allowed. Please use one of the following formats: ${ALLOWED_FILE_TYPES.join(', ')}`,
                    variant: "destructive",
                });
                return false;
            }
            if (selectedFiles.some(selectedFile => selectedFile.file.name === file.name)) {
                toast({
                    title: "Duplicate file",
                    description: `File "${file.name}" has already been selected.`,
                    variant: "destructive",
                });
                return false;
            }
            return true;
        }).map(file => ({
            file,
            preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
        }));
        setSelectedFiles(prevFiles => [...prevFiles, ...newSelectedFiles]);
    };

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prevFiles => {
            const newFiles = [...prevFiles];
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview);
            }
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMessage.trim() !== '' || selectedFiles.length > 0) {
            console.log('Sending message:', newMessage)
            console.log('Sending files:', selectedFiles.map(f => f.file))
            setNewMessage('')
            setSelectedFiles([])
        }
    }

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setNewMessage(prevMessage => prevMessage + emojiData.emoji);
        setShowEmojiPicker(false);
    };

    return (
        <TooltipProvider>
            <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden">
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
                <form onSubmit={handleSendMessage} className="border-t p-4">
                    {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center bg-gray-100 rounded-lg p-1">
                                    {file.preview ? (
                                        // <img src={file.preview} alt="Preview" className="w-8 h-8 object-cover rounded" />
                                        <Image
                                            src={file.preview || '/placeholder-image.png'} // Fallback to a placeholder
                                            alt="Preview"
                                            width={32}
                                            height={32}
                                            className="object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-xs">File</div>
                                    )}
                                    <span className="text-sm truncate max-w-[100px] ml-2">{file.file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        className="ml-1 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex items-center space-x-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            multiple
                            accept={ALLOWED_FILE_TYPES.map(type => `.${type}`).join(',')}
                            className="hidden"
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                            <span role="img" aria-label="Attachment" className="mr-1">📎</span>
                            <span className="sr-only">Attach file</span>
                        </Button>
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-grow"
                        />
                        <div className="relative">
                            <Button type="button" variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                                <Smile className="h-5 w-5" />
                                <span className="sr-only">Insert emoji</span>
                            </Button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-full right-0 mb-2">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                        <Button type="submit" size="icon">
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </form>
            </div>
        </TooltipProvider>
    )
}

