'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import InvitationListItem from "./InvitationListItem";
import { useEffect, useMemo, useState } from "react";

type Invitation = {
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
    invitedBy: string;
    createdAt: Date;
    id: string;
    project: {
        status: string;
        id: string;
        title: string;
    };
    inviter: {
        id: string;
        email: string;
        name: string;
        profilePicture: {
            url: string;
        } | null;
    };
    sentAt: Date | null;
    seen: boolean;
    seenAt: Date | null;
}

const invitations: Invitation[] = [
    {
        id: '1',
        status: 'PENDING',
        invitedBy: 'user1',  // Assuming the ID of the inviter
        createdAt: new Date('2024-03-15'),
        project: {
            status: 'ACTIVE',
            id: 'project1',
            title: 'Website Redesign',
        },
        inviter: {
            id: 'user1',
            email: 'alice@example.com',
            name: 'Alice Johnson',
            profilePicture: {
                url: '/placeholder.svg?height=30&width=30',
            },
        },
        sentAt: new Date('2024-03-15'),
        seen: false,
        seenAt: null,
    },
    {
        id: '2',
        status: 'ACCEPTED',
        invitedBy: 'user2',
        createdAt: new Date('2024-03-10'),
        project: {
            status: 'ACTIVE',
            id: 'project2',
            title: 'Mobile App Development',
        },
        inviter: {
            id: 'user2',
            email: 'bob@example.com',
            name: 'Bob Smith',
            profilePicture: {
                url: '/placeholder.svg?height=30&width=30',
            },
        },
        sentAt: new Date('2024-03-10'),
        seen: true,
        seenAt: new Date('2024-03-11'),
    },
    {
        id: '3',
        status: 'DECLINED',
        invitedBy: 'user3',
        createdAt: new Date('2024-03-05'),
        project: {
            status: 'COMPLETED',
            id: 'project3',
            title: 'Marketing Campaign',
        },
        inviter: {
            id: 'user3',
            email: 'carol@example.com',
            name: 'Carol Davis',
            profilePicture: null,  // No profile picture
        },
        sentAt: new Date('2024-03-05'),
        seen: true,
        seenAt: new Date('2024-03-06'),
    },
    // Add more invitations as needed
];


const InvitationsRightBar = () => {

    const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
    const [filter, setFilter] = useState<'All' | 'PENDING' | 'ACCEPTED' | 'DECLINED'>('All')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredInvitations = useMemo(() => {
        return invitations
            .filter((invitation) => {
                if (filter !== 'All' && invitation.status !== filter) return false
                if (searchTerm && !invitation.project.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
                return true
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }, [filter, searchTerm])

    useEffect(() => {
        if (filteredInvitations.length > 0 && !selectedInvitation) {
            setSelectedInvitation(filteredInvitations[0])
        }
    }, [filteredInvitations, selectedInvitation])

    return (
        <div className="w-full bg-white rounded-3xl p-2">
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
                            <DropdownMenuItem onClick={() => setFilter('PENDING')}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('ACCEPTED')}>Accepted</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('DECLINED')}>Declined</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-8.5rem)]">
                <ul className="space-y-3">
                    {filteredInvitations.map((invitation) => (
                        <li key={invitation.id}>
                            <InvitationListItem
                                invitation={invitation}
                                isSelected={selectedInvitation?.id === invitation.id}
                                onClick={() => setSelectedInvitation(invitation)}
                            />
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </div>
    );
};

export default InvitationsRightBar;