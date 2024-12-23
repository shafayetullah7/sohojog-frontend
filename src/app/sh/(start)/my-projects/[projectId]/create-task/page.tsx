"use client"

import { useState, useCallback, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, X, Search, ChevronLeft, ChevronRight, Upload, FileIcon, DockIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDropzone } from 'react-dropzone'
import { debounce } from "lodash"
import { useParams } from "next/navigation"
import { cn } from "@/_lib/utils"
import { ScrollArea } from "@radix-ui/react-scroll-area"

import { Team } from "@/_lib/redux/api/api-features/roles/manager/manager-team/dto/get-teams/response.dto"
import { GetManagerTeamsRequestQueryDto } from "@/_lib/redux/api/api-features/roles/manager/manager-team/dto/get-teams/request.dto"
import { useGetManagerTeamsQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-team/manager.team.api"
import { useGetManagerParticipationsQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-participation/manager.participation.api"
import { GetParticipationRequestDto } from "@/_lib/redux/api/api-features/roles/manager/manager-participation/dto/get-participations/request.dto"
import { useCreateTaskMutation } from "@/_lib/redux/api/api-features/roles/manager/manager-tasks/manager.task.api"
import { successAlert } from "@/components/alerts/successAlert"
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType"
import { errorAlert } from "@/components/alerts/errorAlert"
import Image from "next/image"

type ProfilePicture = {
    minUrl: string;
};

type User = {
    id: string;
    name: string;
    profilePicture: ProfilePicture | null;
};

export type Participation = {
    id: string;
    projectId: string;
    userId: string;
    status: "ACTIVE" | "INACTIVE" | "PENDING";
    role: "MEMBER" | "ADMIN" | "OWNER";
    designation: string[];
    invitationId: string | null;
    joinedAt: string | null;
    createdAt: string;
    updatedAt: string;
    user: User;
};

type Pagination = {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;
};

export type GetProjectParticipantsResponseDto = {
    participations: Participation[];
    pagination: Pagination;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

// const taskSchema = createTaskSchema.extend({
//   attachments: z.array(z.instanceof(File)).optional(),
// });


export default function CreateTaskPage() {
    const [selectedAssignees, setSelectedAssignees] = useState<Participation[]>([])
    const [selectedTeams, setSelectedTeams] = useState<Team[]>([])
    const [assigneeSearchTerm, setAssigneeSearchTerm] = useState("")
    const [teamSearchTerm, setTeamSearchTerm] = useState("")
    const [assigneePage, setAssigneePage] = useState(1)
    const [teamPage, setTeamPage] = useState(1)
    const [attachments, setAttachments] = useState<File[]>([])
    const params = useParams<{ projectId: string }>();
    const { projectId } = params

    const taskSchema = z.object({
        title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
        description: z.string().max(1000, "Description must be 1000 characters or less").optional(),
        dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
        budget: z.number().min(0, "Budget must be a positive number").optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        taskAssignmentType: z.enum(["INDIVIDUAL", "GROUP"]),
        projectId: z.string().uuid(),
        assigneeIds: z.array(z.string().uuid()).optional(),
        assignedTeams: z.array(z.string().uuid()).optional(),
    });

    type TaskFormData = z.infer<typeof taskSchema>;

    const { register, handleSubmit, control, formState: { errors }, reset: formReset } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            priority: "MEDIUM",
            taskAssignmentType: "INDIVIDUAL",
            projectId,
            assigneeIds: [],
            assignedTeams: [],
        },
    })

    const [teamFilterOptions, setTeamFilterOptions] = useState<GetManagerTeamsRequestQueryDto>({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "asc",
        projectId
    })

    const [participationFilter, setParticipationFilter] = useState<GetParticipationRequestDto>({
        projectId,
        page: assigneePage,
        limit: 30,
    });

    const { data: teamsData, isLoading: isLoadingTeams } = useGetManagerTeamsQuery(teamFilterOptions)
    const { data: participantsData, isLoading: isLoadingParticipants } = useGetManagerParticipationsQuery(participationFilter)
    const [createTask, { isLoading: isCreatingTask }] = useCreateTaskMutation()

    const paginatedAssignees = participantsData?.data;
    const participations = participantsData?.data?.participations;
    const participationPagination = participantsData?.data?.pagination;

    const teams = teamsData?.data?.teams || []



    const onSubmit = async (data: TaskFormData) => {
        const formData = new FormData();
        console.log("Submitting form data");

        // Loop through the `data` object and append each property dynamically
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const value = (data as any)[key];
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(item => formData.append(key, item));
                    } else {
                        formData.append(key, value.toString());
                    }
                }
            }
        }

        // Append assigneeIds and assignedTeams
        selectedAssignees.forEach(assignee => formData.append('assigneeIds', assignee.id));
        selectedTeams.forEach(team => formData.append('assignedTeams', team.id));

        console.log('attachment', attachments);

        // Append files
        attachments.forEach((file) => formData.append('files', file));

        // Log FormData contents for debugging
        console.log('FormData contents:');
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        try {
            const response = await createTask(formData).unwrap();
            console.log('Task created successfully:', response);
            // Success handling
            successAlert({
                title: 'Success',
                description: 'Task created successfully!'
            });

            setAttachments([]);
            setSelectedAssignees([]);
            setSelectedTeams([]);
            formReset()

            // Further success actions like redirect or state update if necessary
        } catch (err) {
            // Error handling
            const axiosError = err as { data: TerrorResponse, status: number };
            const errorMessage = axiosError?.data?.message || 'Failed to create task';

            const error = { title: 'Failed', description: errorMessage };

            errorAlert(error);

            // Optional: Log the error to the console or handle further
            console.error('Error creating task:', err);
        }
    };



    const handleAssigneeSearch = (term: string) => {
        setAssigneeSearchTerm(term)
        setAssigneePage(1)
    }

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            setTeamFilterOptions(prev => ({ ...prev, searchTerm, page: 1 }))
        }, 300),
        []
    )

    const handleTeamSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeamSearchTerm(e.target.value)
        debouncedSearch(e.target.value)
    }

    const addAssignee = (assignee: Participation) => {
        if (!selectedAssignees.some(a => a.id === assignee.id)) {
            setSelectedAssignees(prev => [...prev, assignee])
        }
    }

    const removeAssignee = (assigneeId: string) => {
        setSelectedAssignees(prev => prev.filter(a => a.id !== assigneeId))
    }

    const addTeam = (team: Team) => {
        if (!selectedTeams.some(t => t.id === team.id)) {
            setSelectedTeams(prev => [...prev, team])
        }
    }

    const removeTeam = (teamId: string) => {
        setSelectedTeams(prev => prev.filter(t => t.id !== teamId))
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setAttachments(prev => [...prev, ...acceptedFiles])
    }, [])

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ACCEPTED_FILE_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
        maxSize: MAX_FILE_SIZE,
    })

    const renderFileIcon = (file: File) => {
        const fileType = file.type;
        if (fileType.startsWith("image/")) {
            return (
                // <img
                //     src={URL.createObjectURL(file)}
                //     alt={file.name}
                //     className="h-10 w-10 object-cover rounded-md"
                // />
                <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={40} // Set desired width
                    height={40} // Set desired height
                    className="object-cover rounded-md"
                    unoptimized={true}
                />
            );
        }
        if (fileType === "application/pdf") {
            return <FileIcon className="h-6 w-6 text-gray-600" />;
        }
        if (fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return <DockIcon className="h-6 w-6 text-gray-600" />;
        }
        return <FileIcon className="h-6 w-6 text-gray-600" />;
    };

    useEffect(() => {
        if (selectedAssignees.length > 0) {
            const assigneeIds = selectedAssignees.map(a => a.userId)
            register("assigneeIds", { value: assigneeIds })
        }
    }, [selectedAssignees, register])

    useEffect(() => {
        if (selectedTeams.length > 0) {
            const teamIds = selectedTeams.map(t => t.id)
            register("assignedTeams", { value: teamIds })
        }
    }, [selectedTeams, register])

    return (
        <div className="min-h-screen bg-gray-50 text-gray-500 p-4 md:p-6 lg:p-8">
            <Card className="max-w-5xl mx-auto rounded-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create New Task</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <Input id="title" {...register("title")} className="w-full" />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <Textarea id="description" {...register("description")} className="w-full min-h-[100px]" />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                <Controller
                                    name="dueDate"
                                    control={control}
                                    render={({ field }) => (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            {/* <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent> */}
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    onSelect={(date) => field.onChange(date?.toISOString())}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                />
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                                <Input id="budget" type="number" {...register("budget", { valueAsNumber: true })} className="w-full" />
                                {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="taskAssignmentType" className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
                                <Controller
                                    name="taskAssignmentType"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select assignment type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                                                <SelectItem value="GROUP">Group</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LOW">Low</SelectItem>
                                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                                <SelectItem value="HIGH">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-800">Assign Teams</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Search className="w-4 h-4 text-gray-500" />
                                        <Input
                                            type="text"
                                            value={teamSearchTerm}
                                            onChange={handleTeamSearch}
                                            placeholder="Search for teams"
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedTeams.map(team => (
                                            <Badge key={team.id} variant="secondary" className="flex items-center gap-1 p-1">
                                                <span>{team.name}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                                                    onClick={() => removeTeam(team.id)}
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">Remove {team.name}</span>
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <ScrollArea className="h-[200px] border rounded-md">
                                        <div className="p-4 space-y-2">
                                            {teams?.filter(team => !selectedTeams.find(selected => selected.id === team.id)).map((team) => (
                                                <div
                                                    key={team.id}
                                                    className="flex items-center justify-between p-2 hover:bg-muted cursor-pointer rounded-md transition-all shadow-sm hover:shadow-md duration-300"
                                                    onClick={() => addTeam(team)}
                                                >
                                                    <span className="text-sm font-medium text-gray-800">{team.name}</span>
                                                    <Badge variant="outline" className="text-xs text-gray-700">
                                                        {team?.counts?.memberCount} members
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    {teamsData?.data?.pagination && (
                                        <div className="flex justify-between items-center">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setTeamFilterOptions(prev => ({ ...prev, page: Math.max(prev.page - 1, 1) }))}
                                                disabled={teamFilterOptions.page === 1}
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-2" />
                                                Previous
                                            </Button>
                                            <span className="text-sm text-muted-foreground">
                                                Page {teamFilterOptions.page} of {teamsData.data.pagination.totalPages}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setTeamFilterOptions(prev => ({ ...prev, page: prev.page + 1 }))}
                                                disabled={teamFilterOptions.page === teamsData.data.pagination.totalPages}
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-800">Assign participants</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Search className="w-4 h-4 text-gray-500" />
                                        <Input
                                            type="text"
                                            value={assigneeSearchTerm}
                                            onChange={(e) => handleAssigneeSearch(e.target.value)}
                                            placeholder="Search for assignees"
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAssignees.map(assignee => (
                                            <Badge key={assignee.id} variant="secondary" className="flex items-center gap-1 p-1">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={assignee.user.profilePicture?.minUrl} alt={assignee.user.name} />
                                                    <AvatarFallback>{assignee.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <span>{assignee.user.name}</span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-auto p-0 text-muted-foreground hover:text-foreground"
                                                    onClick={() => removeAssignee(assignee.id)}
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">Remove {assignee.user.name}</span>
                                                </Button>
                                            </Badge>
                                        ))}
                                    </div>
                                    <ScrollArea className="h-[200px] border rounded-md">
                                        <div className="p-4 space-y-2">
                                            {participations?.filter(participation => !selectedAssignees.find(assignee => assignee.id === participation.id))?.map((participation) => (
                                                <div
                                                    key={participation.id}
                                                    className=" space-x-3 p-2 hover:bg-muted cursor-pointer rounded-md shadow-sm hover:shadow-md duration-300 transition-all"
                                                    onClick={() => addAssignee(participation)}
                                                >
                                                    <div className="flex justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="size-10 border-2 border-white shadow-md">
                                                                <AvatarImage src={participation.user.profilePicture?.minUrl} alt={participation.user.name} />
                                                                <AvatarFallback>{participation.user.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-800">{participation.user.name}</p>
                                                                <p className="text-xs text-muted-foreground text-gray-400">{participation.designation.length ? participation.designation.join(', ') : 'Unknown designation'}</p>
                                                            </div>
                                                        </div>
                                                        {participation.joinedAt && <div className="flex items-end mr-2">
                                                            <p className="text-xs text-gray-500"><span className=" font-medium">Joined: </span>{participation.joinedAt ? format(new Date(participation.joinedAt), 'MMMM dd, yyyy') : ''}</p>
                                                        </div>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    {participationPagination && (
                                        <div className="flex justify-between items-center">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setAssigneePage(prev => Math.max(prev - 1, 1))}
                                                disabled={assigneePage === 1}
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-2" />
                                                Previous
                                            </Button>
                                            <span className="text-sm text-muted-foreground">
                                                Page {assigneePage} of {participationPagination?.totalPages || 0}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setAssigneePage(prev => prev + 1)}
                                                disabled={assigneePage === participationPagination.totalPages}
                                            >
                                                Next
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div>
                            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors",
                                    isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
                                )}
                            >
                                <input {...getInputProps()} />
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-500">
                                    Drag and drop some files here, or click to select files
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    (Only *.jpeg, *.png, *.gif, *.pdf files are accepted, max 5MB each)
                                </p>
                            </div>
                            {attachments.length > 0 && (
                                <ul className="mt-4 space-y-2">
                                    {attachments.map((file, index) => (
                                        <li key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                                            <div className="flex items-center gap-2">
                                                {renderFileIcon(file)}
                                                <span className="text-sm truncate">{file.name}</span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeAttachment(index)}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Remove</span>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isCreatingTask}>
                            {isCreatingTask ? 'Creating Task...' : 'Create Task'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}