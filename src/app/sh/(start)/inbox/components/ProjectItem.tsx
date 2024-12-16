import { useState } from 'react'
import { ChevronDown, ChevronRight, MessageSquare, Users, Circle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Project, formatTimeSince } from '../utils/conversationUtils'

type ProjectItemProps = {
    project: Project
}

export function ProjectItem({ project }: ProjectItemProps) {
    const [expanded, setExpanded] = useState(true)

    return (
        <div className="space-y-2">
            <button
                className="flex items-center justify-between w-full text-left text-sm font-medium hover:bg-accent hover:text-accent-foreground p-2 rounded-lg"
                onClick={() => setExpanded(!expanded)}
            >
                <span>{project.name}</span>
                <div className="flex items-center">
                    {project.unread > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full mr-2">
                            {project.unread}
                        </span>
                    )}
                    {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
            </button>
            <div className="text-xs text-muted-foreground ml-2">
                {project.isOwner ? "Owner" : "Participant"} • {project.conversationsCount} conversations • Created {formatTimeSince(project.createdAt)}
            </div>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 space-y-2 ml-4"
                    >
                        <div className="flex items-center space-x-3 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer">
                            <MessageSquare className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">All Participants</span>
                        </div>
                        {project.groups.map((group) => (
                            <div key={group.id} className="flex items-center space-x-3 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg cursor-pointer">
                                <div className="relative">
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    {group.isActive && (
                                        <Circle className="absolute -bottom-0.5 -right-0.5 w-2 h-2 text-green-500 fill-current" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-sm">{group.name}</span>
                                    <p className="text-xs text-muted-foreground truncate">{group.lastMessage}</p>
                                    <p className="text-xs text-muted-foreground">{formatTimeSince(group.lastMessageTime)}</p>
                                </div>
                                {group.unread > 0 && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                                        {group.unread}
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

