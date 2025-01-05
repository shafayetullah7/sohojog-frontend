'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Briefcase, Calendar, FileText, Users } from 'lucide-react'
import { format } from 'date-fns'
import { useGetParticipantProjectsQuery } from '@/_lib/redux/api/api-features/roles/participant/participation/participation.api'
import { useParams, useRouter } from 'next/navigation'


export default function ProjectList() {
  const params = useParams<{ participationId: string }>()
  const { data: participationData, isLoading } = useGetParticipantProjectsQuery();
  const router = useRouter()

  const handleRouting = (participationId: string) => {
    router.push(`/sh/my-participations/${participationId}`)
  }



  if (isLoading) {
    return <ProjectListSkeleton />
  } else {
    if (participationData) {
      return (
        <div className="w-full h-full overflow-y-auto bg-background bg-white rounded-3xl">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center mb-4">
              <Briefcase className="mr-2 h-5 w-5" />
              Projects
            </h2>
            <ScrollArea className="h-[calc(100vh-120px)]">
              <div className="space-y-4">
                {participationData.data?.participations?.map((participation) => {
                  const { project } = participation
                  return (
                    <div
                      key={participation.id}
                      className={`py-2 px-4 rounded-2xl cursor-pointer transition-all 
                      ${params.participationId === participation.id
                          ? "bg-lavender-blush-400-tr-bl text-white"
                          : "hover:bg-lavender-blush-100-tr-bl text-foreground"}`}
                      onClick={() => handleRouting(participation.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 mr-2">
                          <h3
                            className={`font-semibold text-sm truncate 
                            ${params.participationId === participation.id ? "text-white" : "text-foreground"}`}
                            title={project.title}
                          >
                            {project.title}
                          </h3>
                          <div className={`flex items-center mt-1 text-xs 
                          ${params.participationId === participation.id ? "text-white" : "text-muted-foreground"}`}>
                            <Avatar className="size-5 mr-1">
                              <AvatarImage src={project.creator?.profilePicture?.minUrl} alt={project.creator.name} />
                              <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span
                              className={`truncate max-w-[100px] font-medium 
                              ${params.participationId === participation.id ? "text-white" : "text-gray-700"}`}
                              title={project.creator.name}
                            >
                              {project.creator.name}
                            </span>
                          </div>
                          <p
                            className={`text-xs flex items-center mt-1 
                            ${params.participationId === participation.id ? "text-white" : "text-gray-400"}`}>
                            <Calendar className="mr-1 h-3 w-3" />
                            {format(new Date(project.createdAt), 'yyyy-MM-dd')}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-1 text-gray-700">
                          <Badge
                            variant="secondary"
                            className={`text-xs flex items-center 
                            ${params.participationId === participation.id ? "text-white" : ""}`}
                          >
                            <FileText className="mr-1 h-4 w-4" />
                            {project._count.tasks}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className={`text-xs flex items-center 
                            ${params.participationId === participation.id ? "text-white" : ""}`}
                          >
                            <Users className="mr-1 h-4 w-4" />
                            {project._count.participations}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      )
    }
  }


}

function ProjectListSkeleton() {
  return (
    <div className="w-full h-full overflow-y-auto bg-background bg-white rounded-3xl">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center mb-4">
          <Briefcase className="mr-2 h-5 w-5" />
          Projects
        </h2>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="py-2 px-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0 mr-2">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <div className="flex items-center mt-1">
                      <Skeleton className="h-5 w-5 rounded-full mr-1" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-4 w-1/3 mt-1" />
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

