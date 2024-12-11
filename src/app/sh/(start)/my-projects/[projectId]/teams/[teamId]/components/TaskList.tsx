'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'

type Task = {
    id: string
    title: string
    assignee: string
    status: string
    dueDate: string
    created: string
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([
        { id: "1", title: "Market Research for Product X", assignee: "Jane Smith", status: "In Progress", dueDate: "2024-12-15", created: "2023-06-01T09:00:00Z" },
        { id: "2", title: "Develop MVP for Product Y", assignee: "Mike Johnson", status: "Not Started", dueDate: "2025-01-10", created: "2023-06-02T10:30:00Z" },
        { id: "3", title: "User Testing for Product Z", assignee: "John Doe", status: "Completed", dueDate: "2024-11-30", created: "2023-06-03T14:15:00Z" },
        { id: "4", title: "Create Marketing Strategy", assignee: "Emily Brown", status: "In Progress", dueDate: "2024-12-20", created: "2023-06-04T11:45:00Z" },
        { id: "5", title: "Implement New Feature", assignee: "Alex Lee", status: "Not Started", dueDate: "2025-01-05", created: "2023-06-05T16:20:00Z" },
    ])
    const [taskSearch, setTaskSearch] = useState("")
    const [taskFilter, setTaskFilter] = useState("all")
    const [taskSortBy, setTaskSortBy] = useState("created")
    const [taskSortOrder, setTaskSortOrder] = useState("desc")

    const filteredTasks = tasks.filter(task =>
        (task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
            task.assignee.toLowerCase().includes(taskSearch.toLowerCase())) &&
        (taskFilter === "all" || task.status.toLowerCase() === taskFilter.toLowerCase())
    ).sort((a, b) => {
        let comparison = 0
        if (taskSortBy === "dueDate" || taskSortBy === "created") {
            comparison = new Date(a[taskSortBy]).getTime() - new Date(b[taskSortBy]).getTime()
        } else {
            comparison = a[taskSortBy as keyof Task].localeCompare(b[taskSortBy as keyof Task])
        }
        return taskSortOrder === "asc" ? comparison : -comparison
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4 mb-4">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tasks..."
                            value={taskSearch}
                            onChange={(e) => setTaskSearch(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Select value={taskFilter} onValueChange={setTaskFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="not started">Not Started</SelectItem>
                                <SelectItem value="in progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={taskSortBy} onValueChange={setTaskSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="created">Created Date</SelectItem>
                                <SelectItem value="title">Title</SelectItem>
                                <SelectItem value="assignee">Assignee</SelectItem>
                                <SelectItem value="status">Status</SelectItem>
                                <SelectItem value="dueDate">Due Date</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={taskSortOrder} onValueChange={setTaskSortOrder}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Title</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Due Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredTasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">{task.title}</TableCell>
                                <TableCell>{task.assignee}</TableCell>
                                <TableCell>
                                    <Badge variant={task.status.toLowerCase() === 'completed' ? 'default' : 'secondary'}>
                                        {task.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(task.created).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export function TaskListSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4 mb-4">
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="h-10 w-[180px] bg-gray-200 rounded"></div>
                        <div className="h-10 w-[180px] bg-gray-200 rounded"></div>
                        <div className="h-10 w-[180px] bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                            <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
                            <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
                            <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
                            <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}