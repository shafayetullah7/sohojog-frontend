'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { CalendarIcon, Loader2, X } from 'lucide-react'
import { QueryTaskDto } from '@/_lib/redux/api/api-features/roles/participant/tasks/dto/get-tasks/request.dto'
import { useGetParticipantTasksQuery } from '@/_lib/redux/api/api-features/roles/participant/tasks/tasks.api'
import { TaskPriority, TaskStatus } from '@/_constants/enums/task.enums'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

const statusColors = {
  TODO: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
  HALTED: 'bg-red-100 text-red-800',
  ARCHIVED: 'bg-gray-100 text-gray-800',
}

const priorityColors = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800',
}

type Props = {
  participationId: string
}

export function TaskManagement({ participationId }: Props) {
  const router = useRouter()
  const [queryParams, setQueryParams] = useState<QueryTaskDto>({
    participationId,
    page: 1,
    limit: 10,
  })

  const { data, error, isLoading } = useGetParticipantTasksQuery(queryParams)

  const handleFilterChange = (key: keyof QueryTaskDto, value: string | number | undefined) => {
    setQueryParams(prev => ({ ...prev, [key]: value, page: 1 }))
  }

  const handleRemoveFilter = (key: keyof QueryTaskDto) => {
    setQueryParams(prev => {
      const newParams = { ...prev }
      delete newParams[key]
      return { ...newParams, page: 1 }
    })
  }

  const handleSortChange = (column: string) => {
    setQueryParams(prev => ({
      ...prev,
      sortBy: column as QueryTaskDto['sortBy'],
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }

  const handleViewDetails = (taskId: string) => {
    router.push(`/sh/my-participations/${participationId}/${taskId}`)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading tasks. Please try again.</div>
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Input
                placeholder="Search by title"
                value={queryParams.title || ''}
                onChange={(e) => handleFilterChange('title', e.target.value)}
              />
              {queryParams.title && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleRemoveFilter('title')}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove title filter</span>
                </Button>
              )}
            </div>
            <div className="relative">
              <Select
                value={queryParams.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TaskStatus).map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {queryParams.status && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleRemoveFilter('status')}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove status filter</span>
                </Button>
              )}
            </div>
            <div className="relative">
              <Select
                value={queryParams.priority}
                onValueChange={(value) => handleFilterChange('priority', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TaskPriority).map((priority) => (
                    <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {queryParams.priority && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => handleRemoveFilter('priority')}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove priority filter</span>
                </Button>
              )}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {queryParams.dueDateFrom ? format(new Date(queryParams.dueDateFrom), 'PP') : <span>Due Date From</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={queryParams.dueDateFrom ? new Date(queryParams.dueDateFrom) : undefined}
                  onSelect={(date) => handleFilterChange('dueDateFrom', date ? format(date, 'yyyy-MM-dd') : undefined)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {queryParams.dueDateFrom && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFilter('dueDateFrom')}
              >
                <X className="h-4 w-4 mr-2" />
                Remove Due Date From
              </Button>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {queryParams.dueDateTo ? format(new Date(queryParams.dueDateTo), 'PP') : <span>Due Date To</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={queryParams.dueDateTo ? new Date(queryParams.dueDateTo) : undefined}
                  onSelect={(date) => handleFilterChange('dueDateTo', date ? format(date, 'yyyy-MM-dd') : undefined)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {queryParams.dueDateTo && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFilter('dueDateTo')}
              >
                <X className="h-4 w-4 mr-2" />
                Remove Due Date To
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSortChange('title')}>Title</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSortChange('status')}>Status</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSortChange('priority')}>Priority</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSortChange('dueDate')}>Due Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Assigned By</TableHead>
                <TableHead>Assignees</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.tasks.map((task) => (
                <TableRow key={task.id} onClick={() => handleViewDetails(task.id)} className='cursor-pointer '>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block truncate w-32">{task.title}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{task.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[task.status]}>{task.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(task.dueDate), 'PP')}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block truncate w-32">{task.project.title}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{task.project.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{task.managerTasks && task.managerTasks.length > 0 ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={task.managerTasks[0].participation.user.profilePicture.minUrl || ''} alt={task.managerTasks[0].participation.user.name || 'Manager'} />
                            <AvatarFallback>{task.managerTasks[0].participation.user.name?.charAt(0) || 'M'}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{task.managerTasks[0].participation.user.name || 'Unknown Manager'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}</TableCell>
                  <TableCell>{task._count.taskAssignment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {queryParams.page === 1 ? (
                  <PaginationPrevious className="pointer-events-none opacity-50" />
                ) : (
                  <PaginationPrevious
                    onClick={() => handleFilterChange('page', Math.max(1, queryParams.page! - 1))}
                  />
                )}
              </PaginationItem>
              {[...Array(data?.data.pagination.totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handleFilterChange('page', index + 1)}
                    isActive={queryParams.page === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                {queryParams.page === data?.data.pagination.totalPages ? (
                  <PaginationNext className="pointer-events-none opacity-50" />
                ) : (
                  <PaginationNext
                    onClick={() => handleFilterChange('page', Math.min(data?.data.pagination.totalPages || 1, queryParams.page! + 1))}
                  />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}

