'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import debounce from 'lodash/debounce'
import { useGetTeamMembershipsQuery } from '@/_lib/redux/api/api-features/roles/manager/manager-team-membership/manager.team.membership.api'
import { format } from 'date-fns'
import { CreateMembershipModal } from './CreateMembershipModal'

interface MemberListProps {
    teamId: string
    projectId: string
}

export function MemberList({ teamId, projectId }: MemberListProps) {
    const [memberSearch, setMemberSearch] = useState("")
    const [page, setPage] = useState(1)
    const limit = 10

    const { data: membersData, isLoading } = useGetTeamMembershipsQuery({
        teamId,
        projectId,
        searchTerm: memberSearch,
        page: page.toString(),
        limit: limit.toString(),
    })

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setMemberSearch(value)
            setPage(1)
        }, 300),
        []
    )

    const onMemberClick = (id: string) => {

    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value)
    }

    const filteredMembers = membersData?.data?.memberships || []
    const totalPages = membersData?.data?.pagination?.totalPages || 1

    return (
        <Card className="w-full">
            <CardHeader className="py-3">
                <CardTitle className="flex justify-between items-center text-lg">
                    <span>Team Members</span>
                    <CreateMembershipModal teamId={teamId} projectId={projectId} />
                </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search members..."
                            onChange={handleSearchChange}
                            className="pl-8"
                        />
                    </div>
                    <ScrollArea className="h-[300px]">
                        <div className="space-y-2"> 
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : filteredMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between px-2 py-3 rounded-lg hover:bg-accent cursor-pointer shadow-md shadow-gray-100 hover:shadow-gray-300 transition-all duration-300"
                                    onClick={() => onMemberClick(member.id)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="size-10">
                                            <AvatarImage src={member.participation?.user?.profilePicture?.minUrl} alt={member.participation?.user?.name} />
                                            <AvatarFallback>{member.participation?.user?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">{member.participation?.user?.name}</p>
                                            <p className="text-xs text-muted-foreground text-gray-500 mt-1">
                                                Joined {format(new Date(member.joinedAt), 'MMM d, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {member.roles.join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="flex items-center justify-between pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={page === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function MemberListSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader className="py-3">
                <div className="flex justify-between items-center">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded"></div>
                </div>
            </CardHeader>
            <CardContent className="py-2">
                <div className="space-y-3">
                    <div className="h-9 w-full bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-1">
                                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

