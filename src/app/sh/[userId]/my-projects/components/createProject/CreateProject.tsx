"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { X, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ProjectPriority, ProjectStatus, ProjectVisibility } from "@/_constants/enums/project.enums"
import { CreateProjectRequestData, CreateProjectRequestFormData, createProjectSchema } from "./create.project.schema"
import { successAlert } from "@/components/alerts/successAlert"
import { errorAlert } from "@/components/alerts/errorAlert"
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType"
import { useCreateProjectMutation } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi"
import { cn } from "@/_lib/utils"




interface Props {
    updateOpenModal: (value: boolean) => void
}

const CreateProject = ({ updateOpenModal }: Props) => {
    const [tags, setTags] = React.useState<string[]>([])
    const [newTag, setNewTag] = React.useState<string>("");

    // const [createProject, { isLoading, isError, error, isSuccess, data }] = useCreateProjectMutation()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateProjectRequestFormData>({
        resolver: zodResolver(createProjectSchema),
    })

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const addTag = (tagToAdd?: string) => {
        if (tags.length > 5) return;
        const tag = tagToAdd || newTag
        if (tag && tag.length <= 35 && !tags.map(tag => tag.toLowerCase()).includes(tag.toLowerCase())) {
            setTags([...tags, tag])
            setNewTag("") // Reset the input field after adding
        }
    }

    const [createProject, { isLoading, isError, error, isSuccess, data }] = useCreateProjectMutation()

    const onSubmit = async (data: CreateProjectRequestFormData) => {
        const requestData: CreateProjectRequestData = { ...data, tags };

        try {
            const response = await createProject(requestData).unwrap();
            successAlert({ title: 'Success', description: "New Project Created" });

            updateOpenModal(false);

            // console.log("Project created successfully!");
        } catch (err) {
            const axiosError = err as { data: TerrorResponse, status: number };
            const errorMessage = axiosError?.data?.message || 'Failed to create project';

            const error = { title: "Failed", description: errorMessage };

            errorAlert(error);
            // console.error("Error creating project:", err);
        }
    };

    return (
        <div className="sm:w-[400px] md:w-[500px] lg:max-w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto bg-white rounded-lg">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Project title</label>
                    <Input
                        id="title"
                        {...register("title")}
                        placeholder="Add your project title"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Project description</label>
                    <Textarea
                        id="description"
                        {...register("description")}
                        placeholder="Add your project description"
                        className="h-24"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 w-full">
                        <label htmlFor="startDate" className="text-sm font-medium">Start date</label>
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <Popover modal>
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
                                    <PopoverContent className="w-auto p-0 z-50">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
                    </div>

                    <div className="space-y-2 w-full">
                        <label htmlFor="endDate" className="text-sm font-medium">End date</label>
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <Popover modal>
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
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 w-full">
                        <label htmlFor="status" className="text-sm font-medium">Project Status</label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ProjectStatus).map(status => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>

                    <div className="space-y-2 w-full">
                        <label htmlFor="visibility" className="text-sm font-medium">Project Visibility</label>
                        <Controller
                            name="visibility"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ProjectVisibility).map(visibility => (
                                            <SelectItem key={visibility} value={visibility}>
                                                {visibility}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.visibility && <p className="text-red-500 text-sm">{errors.visibility.message}</p>}
                    </div>

                    <div className="space-y-2 w-full">
                        <label htmlFor="priority" className="text-sm font-medium">Project Priority</label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ProjectPriority).map(priority => (
                                            <SelectItem key={priority} value={priority}>
                                                {priority}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)} className="text-gray-500 hover:text-gray-700">
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        ))}
                        <Input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="w-40"
                        />
                        {tags.length <= 6 && <button type="button" onClick={() => addTag()} className="flex items-center px-3 bg-gray-500 rounded-md">
                            <Plus className="size-4 text-white" />
                        </button>}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
                    <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => updateOpenModal(false)}>Cancel</Button>
                    <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>Create Project</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProject