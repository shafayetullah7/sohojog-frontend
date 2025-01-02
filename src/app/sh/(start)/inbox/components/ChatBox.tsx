"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, Users, X, Loader2 } from 'lucide-react'
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
import { useUploadUserFilesMutation } from '@/_lib/redux/api/api-features/files/files.api'
import { useParams } from 'next/navigation'
import { useGetMessagesQuery } from '@/_lib/redux/api/api-features/message/messaging.api'
import { Message } from '@/_lib/redux/api/api-features/message/dto/get-messages/response.dto'
import { Socket } from 'socket.io-client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import useChatSocket from '@/_lib/hooks/useChatSocket'
import { useGetUser } from '@/_lib/hooks/getUser'
import VideoCall from './VideoCall'
import VideoCall2 from './VideoCall2'

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

const ALLOWED_FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'];

const messageSchema = z.object({
    message: z.string().min(1, "Message cannot be empty").max(1000, "Message is too long")
})

type FormData = z.infer<typeof messageSchema>

interface ModifiedMessage extends Message {
    you: boolean
}

export default function ChatBox() {
    const [messages, setMessages] = useState<ModifiedMessage[]>([])
    const [members, setMembers] = useState<Member[]>([])
    const { data: user, isLoading: isUserLoading } = useGetUser();
    const [uploadFiles, { isLoading: isFileUploading }] = useUploadUserFilesMutation()
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isInCall, setIsInCall] = useState(false)
    const [isAudioOnly, setIsAudioOnly] = useState(false) // Added state for audio-only calls
    const [remoteUser, setRemoteUser] = useState({ name: '', avatar: '' }) // Added state for remote user
    const fileInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const params = useParams<{ roomId: string }>()
    const socket = useChatSocket()

    const { data: messageData, isLoading: messageFetchLoading, error: messageFetchError, isFetching } = useGetMessagesQuery({ roomId: params.roomId, page: currentPage, limit: 20 })

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset: formReset } = useForm<FormData>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: '',
        },
    })

    useEffect(() => {
        console.log({ isInCall })
    }, [isInCall])

    useEffect(() => {
        if (messageData?.data?.messages && user?.id) {
            setMessages(prevMessages => {
                const newMessages = messageData.data.messages.filter(
                    newMsg => !prevMessages.some(prevMsg => prevMsg.id === newMsg.id)
                );

                const tempMessages = [...newMessages, ...prevMessages].map(message => ({
                    ...message,
                    you: message.sender.id === user?.id
                }));

                return tempMessages;
            });
        }
    }, [messageData, user]);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleNewMessage = useCallback((data: { userId: string, message: Message }) => {
        setMessages(prevMessages => [
            ...prevMessages,
            { ...data.message, you: user?.id === data.message?.sender?.id }
        ]);
    }, [user]);


    useEffect(() => {
        if (socket && params.roomId && !socket.hasListeners('message')) {
            console.log("Setting up socket listeners");

            const onConnect = () => {
                console.log("Successfully connected to the server");
                socket.emit('joinRoom', { room: params.roomId }, (response: { success: boolean }) => {
                    if (response.success) {
                        console.log(`Successfully joined room: ${params.roomId}`);
                    } else {
                        toast({
                            title: "Error",
                            description: "Failed to join the room.",
                            variant: "destructive",
                        });
                    }
                });
            };

            socket.on("connect", onConnect);
            socket.on('message', handleNewMessage);
            socket.on('joinRoomError', (data) => {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: "destructive",
                });
            });
            socket.on('userJoined', (data) => {
                console.log(`User with ID ${data.userId} joined the room`);
            });

            return () => {
                console.log("Cleaning up socket listeners");
                socket.off("connect", onConnect);
                socket.off('message', handleNewMessage);
                socket.off('joinRoomError');
                socket.off('userJoined');
            };
        }
    }, [socket, handleNewMessage, params.roomId]);



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop } = e.currentTarget;
        if (scrollTop === 0 && !isFetching) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }, [isFetching]);

    const isFileAllowed = (file: File) => {
        const extension = file.name.split('.').pop()?.toLowerCase()
        return extension && ALLOWED_FILE_TYPES.includes(extension)
    }

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
            const newFiles = [...prevFiles]
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview)
            }
            newFiles.splice(index, 1)
            return newFiles
        })
    }

    const onSubmit = async (data: FormData) => {
        if ((!selectedFiles.length && !data.message.trim()) || isSending || !socket?.connected) {
            return;
        }

        setIsSending(true);

        try {
            let fileIds: string[] = [];

            if (selectedFiles.length) {
                const formData = new FormData();
                selectedFiles.forEach(({ file }) => formData.append('files', file));

                try {
                    const uploadedFiles = await uploadFiles(formData).unwrap();
                    fileIds = uploadedFiles.data?.files?.map(file => file.id) ?? [];
                } catch (error) {
                    console.error("Failed to upload file(s):", error);
                    toast({
                        title: "Error",
                        description: "Failed to upload file(s). Please try again.",
                        variant: "destructive",
                    });
                    setIsSending(false);
                    return;
                }
            }

            const payload = {
                roomId: params.roomId,
                content: data.message.trim(),
                fileIds,
            };

            socket?.emit('sendMessage', payload, (response: { success: boolean; error?: string }) => {
                if (!response.success) {
                    console.error("Failed to send message:", response.error);
                    toast({
                        title: "Error",
                        description: response.error || "Failed to send message. Please try again.",
                        variant: "destructive",
                    });
                } else {
                    formReset();
                    setSelectedFiles([]);
                    setValue('message', '');
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    console.log("Message sent successfully!");
                }
                setIsSending(false);
            });
        } catch (error) {
            console.error("Unexpected error during message sending:", error);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
            setIsSending(false);
        }
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setValue('message', watch('message') + emojiData.emoji)
        setShowEmojiPicker(false)
    }

    const startCall = (audioOnly: boolean) => {
        setIsAudioOnly(audioOnly)
        setIsInCall(true)
        // Provide a default value for remoteUser
        setRemoteUser({
            name: "Unknown User",
            avatar: "https://github.com/shadcn.png" // default avatar
        })
    }

    return (
        <TooltipProvider>
            <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src="https://www.example.com/avatars/project-team.jpg" alt="Project Team" />
                            <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-lg font-semibold">Project Team</h2>
                            <p className="text-sm text-muted-foreground">{members.length} members</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => startCall(true)}>
                            <Phone className="h-5 w-5" />
                            <span className="sr-only">Start audio call</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => startCall(false)}>
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
                <ScrollArea className="flex-1 p-4" onScroll={handleScroll}>
                    {isFetching && currentPage > 1 && (
                        <div className="flex justify-center items-center py-2">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    )}
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.you ? 'justify-end' : 'justify-start'} items-start space-x-2`}
                            >
                                {!message.you && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Avatar className="w-8 h-8 cursor-default">
                                                <AvatarImage src={message.sender?.profilePicture?.minUrl} alt={message.sender?.name} />
                                                <AvatarFallback>{message.sender?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TooltipTrigger>
                                        <TooltipContent side={message.you ? "left" : "right"}>
                                            <p className="text-sm font-medium cursor-pointer">{message.sender?.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                                <div className={`max-w-[70%] ${message.you ? 'bg-iceMint-500 text-white' : 'bg-muted bg-gray-100'} rounded-lg px-3 py-2 `}>
                                    <p>{message.content}</p>
                                    <p className="text-xs text-right mt-1 opacity-70">
                                        {format(new Date(message.createdAt), 'HH:mm')}
                                    </p>
                                </div>
                                {message.you && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={message.sender?.profilePicture?.minUrl} alt={message.sender?.name} />
                                        <AvatarFallback>{message.sender?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Message Input */}
                <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4">
                    {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="flex items-center bg-gray-100 rounded-lg p-1">
                                    {file.preview ? (
                                        <Image
                                            src={file.preview}
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
                            {...register('message')}
                            placeholder="Type a message..."
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
                        <Button type="submit" size="icon" disabled={isSending || isFileUploading || !socket || !socket.connected}>
                            {isSending || isFileUploading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="h-5 w-5" />
                            )}
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </form>
                {/* {isInCall && (
                    <VideoCall
                        socket={socket}
                        roomId={params.roomId}
                        onClose={() => setIsInCall(false)}
                        isAudioOnly={isAudioOnly}
                        remoteUser={remoteUser || { name: "Unknown User", avatar: "https://github.com/shadcn.png" }}
                    />
                )} */}
                {isInCall && (
                    <VideoCall2
                        socket={socket}
                        roomId={params.roomId}
                        onClose={() => setIsInCall(false)}
                        // isAudioOnly={isAudioOnly}
                        // remoteUser={remoteUser || { name: "Unknown User", avatar: "https://github.com/shadcn.png" }}
                    />
                )}
                {/* {isInCall && (
                    <p>calling...</p>
                )} */}
            </div>
        </TooltipProvider>
    )
}

