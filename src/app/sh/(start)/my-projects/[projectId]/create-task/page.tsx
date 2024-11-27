"use client"

import { useState, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, X, Search, ChevronLeft, ChevronRight, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDropzone } from 'react-dropzone'
import { cn } from "@/_lib/utils"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z.date(),
  budget: z.number().min(0, "Budget must be a positive number").optional(),
  assignmentType: z.enum(["GROUP", "INDIVIDUAL"]),
  assignees: z.array(z.string()),
  teams: z.array(z.string()),
  attachments: z.array(z.instanceof(File)).optional(),
})

type TaskFormData = z.infer<typeof taskSchema>

type Participant = {
  id: string
  name: string
  designation: string
  profilePicture: string
}

type Team = {
  id: string
  name: string
  memberCount: number
}

export default function CreateTaskPage() {
  const [selectedAssignees, setSelectedAssignees] = useState<Participant[]>([])
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([])
  const [assigneeSearchTerm, setAssigneeSearchTerm] = useState("")
  const [teamSearchTerm, setTeamSearchTerm] = useState("")
  const [assigneePage, setAssigneePage] = useState(1)
  const [teamPage, setTeamPage] = useState(1)
  const [attachments, setAttachments] = useState<File[]>([])

  const { register, handleSubmit, control, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: "MEDIUM",
      assignmentType: "INDIVIDUAL",
      assignees: [],
      teams: [],
      attachments: [],
    },
  })

  const onSubmit = (data: TaskFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, item));
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value as string);
      }
    });
    attachments.forEach(file => formData.append('attachments', file));

    console.log(Object.fromEntries(formData));
    // Handle form submission with formData
  }

  const handleAssigneeSearch = (term: string) => {
    setAssigneeSearchTerm(term)
    setAssigneePage(1)
  }

  const handleTeamSearch = (term: string) => {
    setTeamSearchTerm(term)
    setTeamPage(1)
  }

  const addAssignee = (assignee: Participant) => {
    if (!selectedAssignees.some(a => a.id === assignee.id)) {
      setSelectedAssignees([...selectedAssignees, assignee])
    }
  }

  const removeAssignee = (assigneeId: string) => {
    setSelectedAssignees(selectedAssignees.filter(a => a.id !== assigneeId))
  }

  const addTeam = (team: Team) => {
    if (!selectedTeams.some(t => t.id === team.id)) {
      setSelectedTeams([...selectedTeams, team])
    }
  }

  const removeTeam = (teamId: string) => {
    setSelectedTeams(selectedTeams.filter(t => t.id !== teamId))
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

  // Mock data for demonstration
  const mockParticipants: Participant[] = Array(100).fill(null).map((_, index) => ({
    id: `p${index + 1}`,
    name: `Participant ${index + 1}`,
    designation: `Designation ${index + 1}`,
    profilePicture: `/placeholder.svg?height=32&width=32`,
  }))

  const mockTeams: Team[] = Array(50).fill(null).map((_, index) => ({
    id: `t${index + 1}`,
    name: `Team ${index + 1}`,
    memberCount: Math.floor(Math.random() * 10) + 1,
  }))

  const filteredAssignees = mockParticipants.filter(participant =>
    participant.name.toLowerCase().includes(assigneeSearchTerm.toLowerCase()) ||
    participant.designation.toLowerCase().includes(assigneeSearchTerm.toLowerCase())
  )

  const filteredTeams = mockTeams.filter(team =>
    team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
  )

  const paginatedAssignees = filteredAssignees.slice((assigneePage - 1) * 30, assigneePage * 30)
  const paginatedTeams = filteredTeams.slice((teamPage - 1) * 20, teamPage * 20)

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Task</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Input id="title" {...register("title")} className="w-full" />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
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

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Textarea id="description" {...register("description")} className="w-full h-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <PopoverContent className="w-auto p-0" align="start">
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
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <Input id="budget" type="number" {...register("budget", { valueAsNumber: true })} className="w-full" />
            {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
          </div>

          <div>
            <label htmlFor="assignmentType" className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
            <Controller
              name="assignmentType"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="assignees" className="block text-sm font-medium text-gray-700 mb-1">Assignees</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search assignees..."
                  value={assigneeSearchTerm}
                  onChange={(e) => handleAssigneeSearch(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedAssignees.map((assignee) => (
                  <Badge key={assignee.id} variant="secondary" className="flex items-center gap-1 p-1">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={assignee.profilePicture} alt={assignee.name} />
                      <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{assignee.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => removeAssignee(assignee.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <ul className="mt-2 max-h-60 overflow-auto border rounded-md divide-y divide-gray-200">
                {paginatedAssignees.map((participant) => (
                  <li
                    key={participant.id}
                    className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center space-x-3"
                    onClick={() => addAssignee(participant)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={participant.profilePicture} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      <p className="text-xs text-gray-500">{participant.designation}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAssigneePage(prev => Math.max(prev - 1, 1))}
                  disabled={assigneePage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-500">Page {assigneePage}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAssigneePage(prev => prev + 1)}
                  disabled={paginatedAssignees.length < 30}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="teams" className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search teams..."
                  value={teamSearchTerm}
                  onChange={(e) => handleTeamSearch(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTeams.map((team) => (
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
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <ul className="mt-2 max-h-60 overflow-auto border rounded-md divide-y divide-gray-200">
                {paginatedTeams.map((team) => (
                  <li
                    key={team.id}
                    className="px-3 py-2 hover:bg-muted cursor-pointer flex items-center justify-between"
                    onClick={() => addTeam(team)}
                  >
                    <span className="text-sm font-medium">{team.name}</span>
                    <span className="text-xs text-gray-500">{team.memberCount} members</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTeamPage(prev => Math.max(prev - 1, 1))}
                  disabled={teamPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <span className="text-sm text-gray-500">Page {teamPage}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTeamPage(prev => prev + 1)}
                  disabled={paginatedTeams.length < 20}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
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
            <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {attachments.map((file, index) => (
                <li key={index} className="relative group">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md">
                      <span className="text-sm text-gray-600">{file.name}</span>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button type="submit" className="w-full">Create Task</Button>
      </form>
    </div>
  )
}