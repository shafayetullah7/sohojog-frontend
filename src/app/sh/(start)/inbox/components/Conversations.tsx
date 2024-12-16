"use client"

import { useState, useEffect } from 'react'
import { Search, Users, Folder, ChevronRight, ChevronDown, MessageSquare, Circle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from '@/_lib/utils'

type Conversation = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unread: number
  isActive: boolean
}

type Project = {
  id: string
  name: string
  unread: number
  conversationsCount: number
  createdAt: Date
  groups: {
    id: string
    name: string
    unread: number
    lastMessage: string
    lastMessageTime: Date
    isActive: boolean
  }[]
}

const personalConversations: Conversation[] = [
  { id: '1', name: 'Alice Johnson', avatar: '/avatars/alice.jpg', lastMessage: 'See you tomorrow!', lastMessageTime: new Date(Date.now() - 1000 * 60 * 23), unread: 2, isActive: true },
  { id: '2', name: 'Bob Smith', avatar: '/avatars/bob.jpg', lastMessage: 'The meeting went well', lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), unread: 0, isActive: false },
  { id: '3', name: 'Charlie Brown', avatar: '/avatars/charlie.jpg', lastMessage: 'Thanks for your help!', lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), unread: 1, isActive: true },
]

const myProjects: Project[] = [
  { 
    id: '1', 
    name: 'Website Redesign', 
    unread: 5,
    conversationsCount: 3,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
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
    groups: [
      { id: '2a', name: 'iOS Team', unread: 1, lastMessage: 'Build 0.9.5 is ready for testing', lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), isActive: true },
      { id: '2b', name: 'Android Team', unread: 2, lastMessage: 'Performance optimizations complete', lastMessageTime: new Date(Date.now() - 1000 * 60 * 90), isActive: false },
    ]
  },
]

const participatedProjects: Project[] = [
  { 
    id: '3', 
    name: 'Marketing Campaign', 
    unread: 2,
    conversationsCount: 2,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    groups: [
      { id: '3a', name: 'Content Team', unread: 1, lastMessage: 'Blog post draft is ready', lastMessageTime: new Date(Date.now() - 1000 * 60 * 120), isActive: false },
      { id: '3b', name: 'Analytics Team', unread: 1, lastMessage: 'Campaign metrics updated', lastMessageTime: new Date(Date.now() - 1000 * 60 * 180), isActive: true },
    ]
  },
]

function formatTimeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + "y ago"
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + "mo ago"
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + "d ago"
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + "h ago"
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + "m ago"
  return Math.floor(seconds) + "s ago"
}

export default function Conversations() {
  const [activeTab, setActiveTab] = useState<'personal' | 'projects'>('personal')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({})
  const [expandedCategories, setExpandedCategories] = useState({
    myProjects: true,
    participatedProjects: true,
  })

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => ({ ...prev, [projectId]: !prev[projectId] }))
  }

  const toggleCategory = (category: 'myProjects' | 'participatedProjects') => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }

  const filteredPersonalConversations = personalConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredProjects = [...myProjects, ...participatedProjects].filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.groups.some(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  useEffect(() => {
    // Initialize all projects as expanded
    const initialExpandedState = {} as Record<string, boolean>
    myProjects.concat(participatedProjects).forEach(project => {
      initialExpandedState[project.id] = true
    })
    setExpandedProjects(initialExpandedState)
  }, [])

  return (
    <div className="w-[400px] bg-white  flex flex-col min-h-[560px]">
      {/* Selector Area (Pill-Style Tabs) */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex rounded-full bg-gray-100 p-1">
          <button
            className={cn(
              "flex-1 rounded-full py-2 px-4 text-sm font-medium transition-colors",
              activeTab === 'personal'
                ? "bg-primary text-white"
                : "text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab('personal')}
          >
            <Users className="w-4 h-4 inline-block mr-2" />
            Personal
          </button>
          <button
            className={cn(
              "flex-1 rounded-full py-2 px-4 text-sm font-medium transition-colors",
              activeTab === 'projects'
                ? "bg-primary text-white"
                : "text-gray-500 hover:text-gray-700"
            )}
            onClick={() => setActiveTab('projects')}
          >
            <Folder className="w-4 h-4 inline-block mr-2" />
            Projects
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={activeTab === 'personal' ? "Search conversations..." : "Search projects or groups..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-grow">
        {activeTab === 'personal' ? (
          <div className="p-4 space-y-4">
            {filteredPersonalConversations.map((conv) => (
              <div key={conv.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.avatar} alt={conv.name} />
                    <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conv.isActive && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{conv.name}</p>
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400">{formatTimeSince(conv.lastMessageTime)}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary rounded-full">
                    {conv.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {/* My Projects */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 hover:bg-gray-50 p-2 rounded-lg"
                onClick={() => toggleCategory('myProjects')}
              >
                <span>My Projects</span>
                {expandedCategories.myProjects ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {expandedCategories.myProjects && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 space-y-2"
                  >
                    {myProjects.filter(project => 
                      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.groups.some(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).map((project) => (
                      <div key={project.id} className="ml-4">
                        <button
                          className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:bg-gray-50 p-2 rounded-lg"
                          onClick={() => toggleProject(project.id)}
                        >
                          <span>{project.name}</span>
                          <div className="flex items-center">
                            {project.unread > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary rounded-full mr-2">
                                {project.unread}
                              </span>
                            )}
                            {expandedProjects[project.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </div>
                        </button>
                        <div className="text-xs text-gray-500 ml-2">
                          {project.conversationsCount} conversations • Created {formatTimeSince(project.createdAt)}
                        </div>
                        <AnimatePresence>
                          {expandedProjects[project.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 space-y-2 ml-4"
                            >
                              <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                                <MessageSquare className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">All Participants</span>
                              </div>
                              {project.groups.map((group) => (
                                <div key={group.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                                  <div className="relative">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    {group.isActive && (
                                      <Circle className="absolute -bottom-0.5 -right-0.5 w-2 h-2 text-green-500 fill-current" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-sm text-gray-700">{group.name}</span>
                                    <p className="text-xs text-gray-500 truncate">{group.lastMessage}</p>
                                    <p className="text-xs text-gray-400">{formatTimeSince(group.lastMessageTime)}</p>
                                  </div>
                                  {group.unread > 0 && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary rounded-full">
                                      {group.unread}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Participated Projects */}
            <div>
              <button
                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 hover:bg-gray-50 p-2 rounded-lg"
                onClick={() => toggleCategory('participatedProjects')}
              >
                <span>Participated Projects</span>
                {expandedCategories.participatedProjects ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <AnimatePresence>
                {expandedCategories.participatedProjects && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 space-y-2"
                  >
                    {participatedProjects.filter(project => 
                      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      project.groups.some(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).map((project) => (
                      <div key={project.id} className="ml-4">
                        <button
                          className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:bg-gray-50 p-2 rounded-lg"
                          onClick={() => toggleProject(project.id)}
                        >
                          <span>{project.name}</span>
                          <div className="flex items-center">
                            {project.unread > 0 && (
                              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary rounded-full mr-2">
                                {project.unread}
                              </span>
                            )}
                            {expandedProjects[project.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </div>
                        </button>
                        <div className="text-xs text-gray-500 ml-2">
                          {project.conversationsCount} conversations • Created {formatTimeSince(project.createdAt)}
                        </div>
                        <AnimatePresence>
                          {expandedProjects[project.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 space-y-2 ml-4"
                            >
                              <div className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                                <MessageSquare className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">All Participants</span>
                              </div>
                              {project.groups.map((group) => (
                                <div key={group.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                                  <div className="relative">
                                    <Users className="w-4 h-4 text-gray-400" />
                                    {group.isActive && (
                                      <Circle className="absolute -bottom-0.5 -right-0.5 w-2 h-2 text-green-500 fill-current" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-sm text-gray-700">{group.name}</span>
                                    <p className="text-xs text-gray-500 truncate">{group.lastMessage}</p>
                                    <p className="text-xs text-gray-400">{formatTimeSince(group.lastMessageTime)}</p>
                                  </div>
                                  {group.unread > 0 && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary rounded-full">
                                      {group.unread}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}