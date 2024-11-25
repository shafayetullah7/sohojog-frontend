'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronRight, Calendar, Clock } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'

const tasks = [
    {
        id: 1,
        title: "Complete user flow",
        assignees: [
            { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        assignDate: "2023-05-15",
        dueDate: "2023-05-25",
        status: "In Progress"
    },
    {
        id: 2,
        title: "Finalize color scheme",
        assignees: [
            { name: "Bob Brown", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Charlie Davis", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        assignDate: "2023-05-18",
        dueDate: "2023-05-28",
        status: "Pending"
    },
    {
        id: 3,
        title: "Implement authentication",
        assignees: [
            { name: "Diana Evans", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Ethan Foster", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "Fiona Grant", avatar: "/placeholder.svg?height=32&width=32" },
            { name: "George Harris", avatar: "/placeholder.svg?height=32&width=32" },
        ],
        assignDate: "2023-05-10",
        dueDate: "2023-05-20",
        status: "Completed"
    },
]

export function TasksSection() {
    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-lg font-semibold">Latest Tasks</h2>
                <Button variant="ghost" size="sm" className="text-xs">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
            <TaskList tasks={tasks} />
        </div>
    )
}

function TaskList({ tasks }) {
    return (
        <ul className="divide-y divide-gray-200">
            {tasks.map(task => (
                <li key={task.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <div className="flex items-center mt-1">
                                <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                                <p className="text-xs text-gray-500 mr-4">Assigned: {format(new Date(task.assignDate), 'MMM d, yyyy')}</p>
                                <Clock className="w-4 h-4 text-gray-400 mr-1" />
                                <p className="text-xs text-gray-500">
                                    Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                                    ({getRemainingDays(task.dueDate)})
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <AvatarGroup assignees={task.assignees} />
                            <span className={`ml-2 text-xs font-medium ${getStatusColor(task.status)}`}>
                                {task.status}
                            </span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

function AvatarGroup({ assignees }) {
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const displayedAssignees = assignees.slice(0, 3)
    const remainingCount = assignees.length - 3

    return (
        <TooltipProvider>
            <div className="flex -space-x-2">
                {displayedAssignees.map((assignee, index) => (
                    <Tooltip key={index}>
                        <TooltipTrigger asChild>
                            <Avatar
                                className="border-2 border-white h-8 w-8"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <AvatarImage src={assignee.avatar} alt={assignee.name} />
                                <AvatarFallback>{assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{assignee.name}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
                {remainingCount > 0 && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar className="border-2 border-white bg-gray-300 h-8 w-8">
                                <AvatarFallback>+{remainingCount}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{assignees.slice(3).map(a => a.name).join(', ')}</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        </TooltipProvider>
    )
}

function getRemainingDays(dueDate: string) {
    const today = new Date()
    const due = new Date(dueDate)
    const daysRemaining = differenceInDays(due, today)

    if (daysRemaining < 0) return 'Overdue'
    if (daysRemaining === 0) return 'Due today'
    return `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} left`
}

function getStatusColor(status: string) {
    switch (status) {
        case 'Completed':
            return 'text-green-600'
        case 'In Progress':
            return 'text-blue-600'
        case 'Pending':
            return 'text-yellow-600'
        default:
            return 'text-gray-600'
    }
}