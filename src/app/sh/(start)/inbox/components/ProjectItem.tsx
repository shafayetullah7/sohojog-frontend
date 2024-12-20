import { useState } from 'react'
import { ChevronDown, ChevronRight, MessageSquare, Users, Circle, Crown, User, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Project, formatTimeSince } from '../utils/conversationUtils'
import { ProjectChat } from '@/_lib/redux/api/api-features/message/dto/group-chats/response.dto'
import { useRouter } from 'next/navigation'

type ProjectItemProps = {
    project: ProjectChat
}

export function ProjectItem({ project }: ProjectItemProps) {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter()

    const handleRoting = (roomId: string) => {
        if (roomId) {
            router.push(`/sh/inbox/${roomId}`)
        }
    }

    return (
        <div className=" shadow-lg px-2 py-4 rounded-xl">
            <button
                className="flex items-center justify-between w-full text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2 rounded-lg"
                onClick={() => setExpanded(!expanded)}
            >
                <span>{project.title}</span>
                <div className="flex items-center">
                    {/* {project.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full mr-2">
                            {project.unread}
                        </span>
                    )} */}
                    {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
            </button>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground text-gray-500">
                <div className="flex items-center">
                    {project.admin ? (
                        <Crown className="w-3 h-3 mr-1" />
                    ) : (
                        <User className="w-3 h-3 mr-1" />
                    )}
                    <span>{project.admin ? "Owner" : "Participant"}</span>
                </div>
                <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{project.teams?.length} teams</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Created {formatTimeSince(new Date(project.createdAt))}</span>
                </div>
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 space-y-2 ml-4"
                    >
                        <div className="flex items-center justify-between  hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer bg-iceMint-200"
                            onClick={() => handleRoting(project.group?.room?.id)}>
                            <div className='flex items-center space-x-3 '>
                                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">All Participants</span>
                            </div>
                            <div className='flex items-center space-x-1  text-gray-700'>
                                <Users className="size-3 text-muted-foreground" />
                                <span className='text-xs'>{project.group?.room?._count?.participants || 0}</span>
                            </div>
                        </div>
                        {project.teams.map((team) => (
                            <div key={team.id}
                                onClick={() => handleRoting(team.group?.room?.id)}
                                className="flex items-center space-x-3 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer bg-iceMint-200">
                                <div className="relative">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    {/* {team.isActive && (
                                        <Circle className="absolute -bottom-0.5 -right-0.5 w-2 h-2 text-green-500 fill-current" />
                                    )} */}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm">{team.name}</span>
                                    {/* <p className="text-xs text-muted-foreground truncate">{team.lastMessage}</p>
                                    <p className="text-xs text-muted-foreground">{formatTimeSince(group.lastMessageTime)}</p> */}
                                </div>
                                {/* {group.unread > 0 && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                                        {group.unread}
                                    </span>
                                )} */}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

