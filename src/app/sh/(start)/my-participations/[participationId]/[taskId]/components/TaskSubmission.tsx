'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, File } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { useSubmitParticipantTaskMutation } from '@/_lib/redux/api/api-features/roles/participant/tasks/tasks.api'
import { TerrorResponse } from '@/_lib/redux/data-types/responseDataType'
import { errorAlert } from '@/components/alerts/errorAlert'

interface FileWithPreview extends File {
    preview: string;
}

type Props = {
    taskId: string
}

export function TaskSubmission({ taskId }: Props) {
    const [description, setDescription] = useState('')
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [submitTask, { isLoading }] = useSubmitParticipantTaskMutation();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (files.length + acceptedFiles.length > 6) {
            alert('You can only upload a maximum of 6 files.')
            return
        }

        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ])
    }, [files])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/pdf': []
        },
        maxFiles: 6,
        multiple: true
    })

    const removeFile = (file: FileWithPreview) => {
        setFiles(prevFiles => prevFiles.filter(f => f !== file))
        URL.revokeObjectURL(file.preview)
    }

    /*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle submission logic here
        console.log('Description:', description)
        console.log('Files:', files)
    }
    */

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!description) {
            alert('Please provide a description.');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('taskId', taskId);

        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await submitTask(formData).unwrap();
            console.log('Task submitted successfully:', response);
            alert('Task submitted successfully!');
            // Clear the form after successful submission
            setDescription('');
            setFiles([]);
        } catch (err) {
            // console.error('Error submitting task:', error);
            // alert('Failed to submit the task. Please try again.');
            const axiosError = err as { data: TerrorResponse, status: number };
            const errorMessage = axiosError?.data?.message || 'Failed to create task';

            const error = { title: 'Failed', description: errorMessage };

            errorAlert(error);

            // Optional: Log the error to the console or handle further
            console.error('Error creating task:', err);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Submit Task</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Textarea
                            placeholder="Enter task description (max 1000 characters)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
                            rows={5}
                            maxLength={1000}
                            className="resize-none"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            {description.length}/1000 characters
                        </p>
                    </div>

                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ease-in-out cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                            }`}
                    >
                        <input {...getInputProps()} />
                        <div className="flex flex-col items-center space-y-4">
                            <Upload className={`h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                            {isDragActive ? (
                                <p className="text-lg font-medium text-blue-500">Drop the files here ...</p>
                            ) : (
                                <>
                                    <p className="text-lg font-medium">Drag &apos;n&apos; drop files here, or click to select files</p>
                                    <p className="text-sm text-gray-500">
                                        (Max 6 files, images and PDFs only)
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Uploaded Files ({files.length}/6)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {files.map((file) => (
                                    <div key={file.name} className="relative group">
                                        <div className="border rounded-lg p-4 flex items-center space-x-4 group-hover:bg-gray-50 transition-colors duration-200">
                                            {file.type.startsWith('image/') ? (
                                                <Image
                                                    src={file.preview}
                                                    alt={file.name}
                                                    width={12} // Adjust based on your layout needs
                                                    height={12} // Adjust based on your layout needs
                                                    className="w-20 h-20 object-cover object-center rounded-md"
                                                />
                                            ) : (
                                                <File className="w-16 h-16 text-gray-400" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                onClick={() => removeFile(file)}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Remove file</span>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading || description.trim() === ''}>
                        Submit Task
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

