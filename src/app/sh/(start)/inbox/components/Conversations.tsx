"use client"

import { useState, useEffect } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Conversation, Project, ProjectFilter } from '../utils/conversationUtils'
import { PersonalConversation } from './PersonalConversation'
import { TabSelector } from './TabSelector'
import { SearchAndFilter } from './SearchAndFilter'
import { ProjectItem } from './ProjectItem'
import ProjectConversations from './ProjectConversations'


const personalConversations: Conversation[] = [
    { id: '1', name: 'Alice Johnson', avatar: '/avatars/alice.jpg', lastMessage: 'See you tomorrow!', lastMessageTime: new Date(Date.now() - 1000 * 60 * 23), unread: 2, isActive: true },
    { id: '2', name: 'Bob Smith', avatar: '/avatars/bob.jpg', lastMessage: 'The meeting went well', lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), unread: 0, isActive: false },
    { id: '3', name: 'Charlie Brown', avatar: '/avatars/charlie.jpg', lastMessage: 'Thanks for your help!', lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), unread: 1, isActive: true },
]

const allProjects: Project[] = [
    {
        id: '1',
        name: 'Website Redesign',
        unread: 5,
        conversationsCount: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
        isOwner: true,
        groups: [
            { id: '1a', name: 'Design Team', unread: 2, lastMessage: 'New mockups are ready', lastMessageTime: new Date(Date.now() - 1000 * 60 * 45), isActive: true },
            { id: '1b', name: 'Development Team', unread: 3, lastMessage: 'Backend API is updated', lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3), isActive: false },
        ]
    },
    {
        id: '2',
        name: 'Mobile App',
        unread: 3,
        conversationsCount: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 60 days ago
        isOwner: true,
        groups: [
            { id: '2a', name: 'iOS Team', unread: 1, lastMessage: 'Build 0.9.5 is ready for testing', lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), isActive: true },
            { id: '2b', name: 'Android Team', unread: 2, lastMessage: 'Performance optimizations complete', lastMessageTime: new Date(Date.now() - 1000 * 60 * 90), isActive: false },
        ]
    },
    {
        id: '3',
        name: 'Marketing Campaign',
        unread: 2,
        conversationsCount: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
        isOwner: false,
        groups: [
            { id: '3a', name: 'Content Team', unread: 1, lastMessage: 'Blog post draft is ready', lastMessageTime: new Date(Date.now() - 1000 * 60 * 120), isActive: false },
            { id: '3b', name: 'Analytics Team', unread: 1, lastMessage: 'Campaign metrics updated', lastMessageTime: new Date(Date.now() - 1000 * 60 * 180), isActive: true },
        ]
    },
]

export default function Conversations() {
    const [activeTab, setActiveTab] = useState<'personal' | 'projects'>('personal')
    const [searchQuery, setSearchQuery] = useState('')
    const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all')

    // console.log('on conversations page')

    const filteredPersonalConversations = personalConversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredProjects = allProjects.filter(project =>
    (projectFilter === 'all' ||
        (projectFilter === 'myProjects' && project.isOwner) ||
        (projectFilter === 'participatedProjects' && !project.isOwner))
    ).filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.groups.some(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="w-full bg-white flex flex-col h-full rounded-2xl">
            <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
            <SearchAndFilter
                activeTab={activeTab}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                projectFilter={projectFilter}
                setProjectFilter={setProjectFilter}
            />
            <ScrollArea className="flex-grow">
                {activeTab === 'personal' ? (
                    <div className="p-4 space-y-4">
                        {filteredPersonalConversations.map((conv) => (
                            <PersonalConversation key={conv.id} conv={conv} />
                        ))}
                    </div>
                ) : (
                    // <div className="p-4 space-y-4">
                    //     {filteredProjects.map((project) => (
                    //         <ProjectItem key={project.id} project={project} />
                    //     ))}
                    // </div>
                    <ProjectConversations />
                )}
            </ScrollArea>
        </div>
    )
}

