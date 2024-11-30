'use client'

import { useState, useEffect, useCallback } from 'react'
import debounce from 'lodash.debounce'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Search, Users, CheckSquare, ArrowUpDown, Filter } from 'lucide-react'
import { useGetManagerTeamsQuery } from '@/_lib/redux/api/api-features/roles/manager/manager-team/manager.team.api'
import { GetManagerTeamsRequestQueryDto, TeamStatus } from '@/_lib/redux/api/api-features/roles/manager/manager-team/dto/get-teams/request.dto'

type SortBy = 'createdAt' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

export default function AllTeamsPage() {
    const [filterOptions, setFilterOptions] = useState<GetManagerTeamsRequestQueryDto>({
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "asc"
    })

    const { data, isLoading, isError } = useGetManagerTeamsQuery({
        ...filterOptions
    })

    // Debounced handler for search
    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            setFilterOptions(prev => ({ ...prev, searchTerm, page: 1 }))
        }, 300), // 300ms delay
        []
    )

    // Wrapper for the input's onChange to call the debounced handler
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
    }

    const handleStatusChange = (status: TeamStatus | 'ALL') => {
        if (status === 'ALL') {
            const { status, ...rest } = filterOptions
            setFilterOptions({ ...rest, page: 1 })
        } else {
            setFilterOptions(prev => ({ ...prev, status, page: 1 }))
        }
    }

    const handleSortChange = (sortBy: SortBy) => {
        setFilterOptions(prev => ({
            ...prev,
            sortBy,
            page: 1
        }))
    }

    const handleOrderChange = (sortOrder: SortOrder) => {
        setFilterOptions(prev => ({
            ...prev,
            sortOrder,
            page: 1
        }))
    }

    const handlePageChange = (newPage: number) => {
        setFilterOptions(prev => ({ ...prev, page: newPage }))
    }

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
    if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error fetching teams</div>

    const teams = data?.data.teams || []
    const pagination = data?.data.pagination;


    return (
        <div className="p-4 space-y-6 rounded-3xl">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">All Teams</CardTitle>
                    <Badge variant="outline" className="text-sm">
                        {pagination?.totalTeams || 0} Total Teams
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="relative flex-grow max-w-sm">
                            <Input
                                type="text"
                                placeholder="Search teams..."
                                onChange={handleSearchChange} // Use the wrapper function
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                        <Select onValueChange={(value: TeamStatus | 'ALL') => handleStatusChange(value)}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ALL">All</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                                <SelectItem value="ARCHIVED">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value: SortBy) => handleSortChange(value)}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="createdAt">Created At</SelectItem>
                                <SelectItem value="updatedAt">Updated At</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value: SortOrder) => handleOrderChange(value)}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Name</TableHead>
                                    <TableHead className="font-semibold">Status</TableHead>
                                    <TableHead className="font-semibold">Members</TableHead>
                                    <TableHead className="font-semibold">Tasks</TableHead>
                                    <TableHead className="font-semibold">Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teams.map(team => (
                                    <TableRow key={team.id} className="hover:bg-muted/50 transition-colors">
                                        <TableCell className="font-medium">{team.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={team.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                                {team.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {/* Members logic */}
                                        </TableCell>
                                        <TableCell>
                                            {/* Tasks logic */}
                                        </TableCell>
                                        <TableCell>{new Date(team.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination logic */}
                </CardContent>
            </Card>
        </div>
    )
}
