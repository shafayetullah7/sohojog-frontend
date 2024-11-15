'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import InvitationListItem from "./InvitationListItem";
import { useEffect, useMemo, useState } from "react";

type Invitation = {
    id: string
    projectTitle: string
    invitedPerson: {
        name: string
        image: string
    }
    date: Date
    status: 'Pending' | 'Accepted' | 'Declined'
    description: string
    eventDate?: Date
    location?: string
    notes?: string
}

const invitations: Invitation[] = [
    {
        id: '1',
        projectTitle: 'Website Redesign',
        invitedPerson: {
            name: 'Alice Johnson',
            image: '/placeholder.svg?height=30&width=30',
        },
        date: new Date('2024-03-15'),
        status: 'Pending',
        description: 'Join our team for an exciting website redesign project.',
        eventDate: new Date('2024-04-01'),
        location: 'Virtual Meeting',
        notes: 'Please review the project brief before the meeting.',
    },
    {
        id: '2',
        projectTitle: 'Mobile App Development',
        invitedPerson: {
            name: 'Bob Smith',
            image: '/placeholder.svg?height=30&width=30',
        },
        date: new Date('2024-03-10'),
        status: 'Accepted',
        description: 'We need your expertise for our new mobile app development.',
        eventDate: new Date('2024-03-20'),
        location: 'Office - Room 302',
    },
    {
        id: '3',
        projectTitle: 'Marketing Campaign',
        invitedPerson: {
            name: 'Carol Davis',
            image: '/placeholder.svg?height=30&width=30',
        },
        date: new Date('2024-03-05'),
        status: 'Declined',
        description: 'Planning session for our upcoming marketing campaign.',
    },
    // Add more invitations as needed
]

const InvitationsRightBar = () => {

    const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
    const [filter, setFilter] = useState<'All' | 'Pending' | 'Accepted' | 'Declined'>('All')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredInvitations = useMemo(() => {
        return invitations
            .filter((invitation) => {
                if (filter !== 'All' && invitation.status !== filter) return false
                if (searchTerm && !invitation.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())) return false
                return true
            })
            .sort((a, b) => b.date.getTime() - a.date.getTime())
    }, [filter, searchTerm])

    useEffect(() => {
        if (filteredInvitations.length > 0 && !selectedInvitation) {
            setSelectedInvitation(filteredInvitations[0])
        }
    }, [filteredInvitations, selectedInvitation])

    return (
        <div className="w-full bg-white">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold mb-2">Invitations</h2>
                <div className="flex items-center space-x-2 mb-2">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                                <span className="sr-only">Filter invitations</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setFilter('All')}>All</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('Pending')}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('Accepted')}>Accepted</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('Declined')}>Declined</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-8.5rem)]">
                {filteredInvitations.map((invitation) => (
                    <InvitationListItem
                        key={invitation.id}
                        invitation={invitation}
                        isSelected={selectedInvitation?.id === invitation.id}
                        onClick={() => setSelectedInvitation(invitation)}
                    />
                ))}
            </ScrollArea>
        </div>
    );
};

export default InvitationsRightBar;