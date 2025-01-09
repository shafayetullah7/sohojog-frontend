'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useGetParticipantSingleTaskQuery } from '@/_lib/redux/api/api-features/roles/participant/tasks/tasks.api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Loader2, Paperclip, Users, User } from 'lucide-react'
import { TaskStatus, TaskPriority, TaskAssignmentType } from "@/_constants/enums/task.enums"
import { AttachmentViewer } from './AttachmentViewer'
import { TaskSubmission } from './TaskSubmission'

const statusColors = {
    [TaskStatus.TODO]: 'bg-yellow-100 text-yellow-800',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [TaskStatus.DONE]: 'bg-green-100 text-green-800',
    [TaskStatus.HALTED]: 'bg-red-100 text-red-800',
    [TaskStatus.ARCHIVED]: 'bg-gray-100 text-gray-800',
}

const priorityColors = {
    [TaskPriority.LOW]: 'bg-green-100 text-green-800',
    [TaskPriority.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TaskPriority.HIGH]: 'bg-orange-100 text-orange-800',
    [TaskPriority.CRITICAL]: 'bg-red-100 text-red-800',
}

type Props = {
    taskId: string
}

export function ParticipantTaskDetails({ taskId }: Props) {
    const { data, error, isLoading } = useGetParticipantSingleTaskQuery(taskId)

    useEffect(() => {
        console.log(data?.data);
        console.log('***********')
    }, [data])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (error) {
        return <div className="text-red-500">Error loading task details. Please try again.</div>
    }

    const task = data?.data.task;




    if (!task) {
        return <div className="text-red-500">No task data available.</div>
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                        <Badge className={statusColors[task.status]}>{task.status}</Badge>
                        <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                        <Badge variant="outline">{task.taskAssignmentType}</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">Description</h3>
                            <p>{task.description || 'No description provided.'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium">Due Date</h4>
                                <p>{format(new Date(task.dueDate), 'PPP')}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Budget</h4>
                                <p>{task.inableBudget ? `$${task.budget.toFixed(2)}` : 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Created At</h4>
                                <p>{format(new Date(task.createdAt), 'PPP')}</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Last Updated</h4>
                                <p>{format(new Date(task.updatedAt), 'PPP')}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={task.project.creator.profilePicture?.midUrl} />
                            <AvatarFallback>{task.project.creator.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold">{task.project.title}</h3>
                            <p className="text-sm text-gray-500">Created by {task.project.creator.name}</p>
                            <p className="text-sm text-gray-500">on {format(new Date(task.project.createdAt), 'PPP')}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Team Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {task.teamTaskAssignment.map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <span>{assignment.team.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {assignment.team.memberShips[0]?.teamLeader && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={assignment.team.memberShips[0].teamLeader.membership.participation.user.profilePicture?.minUrl} />
                                            <AvatarFallback>{assignment.team.memberShips[0].teamLeader.membership.participation.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <span className="text-sm text-gray-500">Team Leader</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Task Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {task.taskAttachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center space-x-2">
                                <AttachmentViewer file={attachment.file}></AttachmentViewer>

                                {/* <Paperclip className="h-4 w-4" />
                                <span>{attachment.file.fileName}</span>
                                <span className="text-sm text-gray-500">({attachment.file.fileType})</span>
                                <Button variant="outline" size="sm">Download</Button> */}
                            </div>
                        ))}
                        {task.taskAttachments.length === 0 && (
                            <p className="text-gray-500">No attachments for this task.</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Task Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {task.taskAssignment.map((assignment) => (
                            <div key={assignment.id}>
                                <h4 className="font-medium">Assignment ID: {assignment.id}</h4>
                                <div className="mt-2 space-y-2">

                                    {/* {assignment.assignmentSubmission.map((submission) => (
                                        <div key={submission.id} className="flex items-center space-x-2">
                                            <User className="h-4 w-4" />
                                            <span>Submission ID: {submission.id}</span>
                                            <div className="flex-1" />
                                            {submission.submissionFile.map((file) => (
                                                <Button key={file.id} variant="outline" size="sm">
                                                    Download {file.file.fileName}
                                                </Button>
                                            ))}
                                        </div>
                                    ))} */}

                                </div>
                                <Separator className="my-2" />
                            </div>
                        ))}
                        {task.taskAssignment.length === 0 && (
                            <p className="text-gray-500">No assignments for this task.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
            {!isLoading && <>
                {((task.taskAssignment?.length && task.taskAssignment[0]?.assignmentSubmission) || task.taskSubmission) ? <TaskSubmission taskId={taskId}></TaskSubmission> : <></>}
            </>}
        </div>
    )
}

