'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, ChevronDown, ChevronUp, Clock, Flag, Tag, Users, Briefcase, Eye } from 'lucide-react'

interface ProfilePicture {
  minUrl: string;
  midUrl: string;
  fullUrl: string;
}

interface Creator {
  name: string;
  profilePicture: ProfilePicture;
}

interface Count {
  participations: number;
  tasks: number;
  teams: number;
}

interface ProjectDetailsResponseDto {
  id: string;
  title: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "UPCOMING";
  startDate: string;
  endDate: string;
  groupId: string;
  creatorId: string;
  visibility: "PUBLIC" | "PRIVATE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  createdAt: string;
  updatedAt: string;
  tags: string[];
  creator: Creator;
  _count: Count;
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
}

const statusColors = {
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  UPCOMING: 'bg-purple-100 text-purple-800',
}

export function ProjectDetailsHeader({ project }: { project: ProjectDetailsResponseDto }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
          <CollapsibleTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700">
              {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </CollapsibleTrigger>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className={statusColors[project.status]}>
            {project.status}
          </Badge>
          <Badge variant="secondary" className={priorityColors[project.priority]}>
            <Flag className="w-3 h-3 mr-1" />
            {project.priority}
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            <Eye className="w-3 h-3 mr-1" />
            {project.visibility}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{format(new Date(project.startDate), 'MMM d, yyyy')} - {format(new Date(project.endDate), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="w-4 h-4 mr-2" />
          <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="relative"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage
                      src={isHovering ? project.creator.profilePicture.midUrl : project.creator.profilePicture.minUrl}
                      alt={project.creator.name}
                    />
                    <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{project.creator.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div>
            <p className="text-sm font-medium text-gray-900">Created by</p>
            <p className="text-sm text-gray-500">{project.creator.name}</p>
          </div>
        </div>
      </div>

      <CollapsibleContent>
        <div className="px-6 pb-6">
          <p className="text-gray-700 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700">{project._count.participations} Participants</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700">{project._count.tasks} Tasks</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-sm text-gray-700">{project._count.teams} Teams</span>
            </div>
          </div>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

