'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Clock, Flag, Tag, Users, Briefcase, Eye, UserCheck } from 'lucide-react'
import { useGetParticipantProjectDetailsQuery } from '@/_lib/redux/api/api-features/roles/participant/participation/participation.api'



const projectStatusColors = {
  PLANNING: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  ON_HOLD: 'bg-orange-100 text-orange-800',
};

const participationStatusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  REMOVED: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800', // Keeping for backward compatibility
};

const participationRoleColors = {
  MEMBER: 'bg-blue-100 text-blue-800',
  ADMIN: 'bg-purple-100 text-purple-800',
  CREATOR: 'bg-red-100 text-red-800',
};

const projectPriorityColors = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800',
  CRITICAL: 'bg-purple-100 text-purple-800',
};


type Props = {
  participationId: string
}

export function ProjectDetailsHeader({ participationId }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const { data: participationData, isLoading, error } = useGetParticipantProjectDetailsQuery(participationId)

  if (isLoading) return <div>Loading...</div>
  else {
    if (error) return <div>Error loading project details</div>
    else {
      if (participationData) {
        const { participation } = participationData.data;
        const { project } = participation
        return (
          <motion.div
            className="w-full bg-white shadow-md rounded-lg overflow-hidden"
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { height: "auto" },
              closed: { height: "auto" }
            }}
          >
            <motion.div
              className="p-6"
              variants={{
                open: { marginBottom: 0 },
                closed: { marginBottom: "-1rem" }
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                <motion.button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpen(!isOpen)}
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} />
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className={projectStatusColors[project.status]}>
                  {project.status}
                </Badge>
                <Badge variant="secondary" className={projectPriorityColors[project.priority]}>
                  <Flag className="w-3 h-3 mr-1" />
                  {project.priority}
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  <Eye className="w-3 h-3 mr-1" />
                  {project.visibility}
                </Badge>
                <Badge variant="secondary" className={participationStatusColors[participation.status]}>
                  <UserCheck className="w-3 h-3 mr-1" />
                  {participation.status}
                </Badge>
              </div>
              <div className='flex items-start justify-between'>
                <div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{format(new Date(project.startDate), 'MMM d, yyyy')} - {format(new Date(project.endDate), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
                  </div>
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


            </motion.div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 mb-4 text-xs">{project.description}</p>
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
                    <div className="mt-4">
                      {/* <h3 className="text-lg font-semibold mb-2">Your Participation</h3> */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Role: {participation.role}
                        </Badge>
                        {participation.designation.map((designation, index) => (
                          <Badge key={index} variant="outline">
                            {designation}
                          </Badge>
                        ))}
                      </div>
                      {participation.joinedAt && (
                        <p className="text-sm text-gray-500 mt-2">
                          Joined on {format(new Date(participation.joinedAt), 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      }
    }
  }




}

