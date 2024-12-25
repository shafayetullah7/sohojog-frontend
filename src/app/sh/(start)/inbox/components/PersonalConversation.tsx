'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Conversation, formatTimeSince } from '../utils/conversationUtils'

type PersonalConversationProps = {
    conv: Conversation
}

export function PersonalConversation({ conv }: PersonalConversationProps) {
    return (
        <div className="flex items-center space-x-3 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer">
            <div className="relative">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.avatar} alt={conv.name} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {conv.isActive && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-800">{conv.name}</p>
                <p className={`text-xs text-muted-foreground text-gray-500 ${conv.unread ? 'font-bold' : ''} truncate`}>{conv.lastMessage}</p>
                <p className="text-xs text-muted-foreground text-gray-500">{formatTimeSince(conv.lastMessageTime)}</p>
            </div>
            {conv.unread > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-gray-200 rounded-full">
                    {conv.unread}
                </span>
            )}
        </div>
    )
}

