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
import { useGetParticipantInvitationsQuery } from "@/_lib/redux/api/api-features/roles/participant/invitation/my.invitations.api"
import { useGetManagerTeamsQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-team/manager.team.api"

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

  const { data: participants, isLoading: isLoadingParticipants } = useGetParticipantInvitationsQuery(assigneeSearchTerm)
  const { data: teams, isLoading: isLoadingTeams } = useGetManagerTeamsQuery(teamSearchTerm)

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

  const filteredAssignees = participants?.filter(participant =>
    participant.name.toLowerCase().includes(assigneeSearchTerm.toLowerCase()) ||
    participant.designation.toLowerCase().includes(assigneeSearchTerm.toLowerCase())
  ) || []

  const filteredTeams = teams?.filter(team =>
    team.name.toLowerCase().includes(teamSearchTerm.toLowerCase())
  ) || []

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
          <Textarea id="description" {...register("description")} className="w-full" />
        </div>

        {/* Assignees Section */}
        <div>
          <label htmlFor="assignees" className="block text-sm font-medium text-gray-700 mb-1">Assignees</label>
          <div>
            <Input
              placeholder="Search assignees"
              value={assigneeSearchTerm}
              onChange={e => handleAssigneeSearch(e.target.value)}
            />
            <div className="space-y-2">
              {isLoadingParticipants ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-2">
                  {paginatedAssignees.map(participant => (
                    <div key={participant.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="mr-2">
                          <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{participant.name}</span>
                      </div>
                      <Button onClick={() => addAssignee(participant)}>Add</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Teams Section */}
        <div>
          <label htmlFor="teams" className="block text-sm font-medium text-gray-700 mb-1">Teams</label>
          <div>
            <Input
              placeholder="Search teams"
              value={teamSearchTerm}
              onChange={e => handleTeamSearch(e.target.value)}
            />
            <div className="space-y-2">
              {isLoadingTeams ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-2">
                  {paginatedTeams.map(team => (
                    <div key={team.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span>{team.name}</span>
                      </div>
                      <Button onClick={() => addTeam(team)}>Add</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Attachments Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
          <div {...getRootProps()} className="p-4 border border-dashed rounded-md">
            <input {...getInputProps()} />
            <p className="text-sm text-gray-500">{isDragActive ? 'Drop the files here' : 'Drag and drop files or click to select'}</p>
          </div>
          {attachments.length > 0 && (
            <div className="mt-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <Button variant="ghost" onClick={() => removeAttachment(index)}><X className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full">Create Task</Button>
      </form>
    </div>
  )
}
