'use client'

import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FileIcon, Clock } from 'lucide-react'

interface File {
    id: string;
    file: string;
    fileName: string;
    fileType: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    extension: string;
}

interface SubmissionFile {
    id: string;
    file: File;
}

interface AssignmentSubmission {
    id: string;
    assignmentId: string;
    description: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    updatedAt: string;
    participationId: string | null;
    submissionFile: SubmissionFile[];
}

interface TaskAssignment {
    id: string;
    taskId: string;
    participationId: string | null;
    assignedAt: string;
    assignmentSubmission: AssignmentSubmission | null;
}

export function TaskAssignmentDisplay({ taskAssignment }: { taskAssignment: TaskAssignment }) {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Task Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Assigned At</h3>
                        <p className="mt-1 text-sm text-gray-900">{format(new Date(taskAssignment.assignedAt), 'PPP p')}</p>
                    </div>
                    {taskAssignment.assignmentSubmission && (
                        <div className="text-right">
                            <h3 className="text-sm font-medium text-gray-500">Submitted At</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {format(new Date(taskAssignment.assignmentSubmission.createdAt), 'PPP p')}
                            </p>
                        </div>
                    )}
                </div>

                {taskAssignment.assignmentSubmission && (
                    <>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
                                {taskAssignment.assignmentSubmission.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Submitted Files</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {taskAssignment.assignmentSubmission.submissionFile.map((file) => (
                                    <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                                        {file.file.fileType === 'IMAGE' ? (
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={file.file.file} alt={file.file.fileName} />
                                                <AvatarFallback>IMG</AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <FileIcon className="h-10 w-10 text-blue-500" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{file.file.fileName}</p>
                                            <p className="text-xs text-gray-500">{file.file.fileType.toLowerCase()}</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={file.file.file} target="_blank" rel="noopener noreferrer">View</a>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {!taskAssignment.assignmentSubmission && (
                    <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No submission available for this assignment yet.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

