'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter } from "lucide-react";
import InvitationListItem, { Invitation } from "./InvitationListItem";
import { useEffect, useMemo, useState } from "react";
import { useGetParticipantInvitationsMutation } from "@/_lib/redux/api/api-features/roles/participant/invitation/my.invitations.api";

const InvitationSkeleton = () => (
  <div className="flex items-center space-x-4 p-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

const InvitationsRightBar = () => {
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null);
  const [filter, setFilter] = useState<'All' | 'PENDING' | 'ACCEPTED' | 'DECLINED'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [getParticipantInvitations, { data: invitationsData, isLoading, isError }] =
    useGetParticipantInvitationsMutation();

//   useEffect(() => {
//     getParticipantInvitations({
//       filter: filter === 'All' ? undefined : filter,
//       searchTerm: searchTerm || undefined,
//     });
//   }, [filter, searchTerm, getParticipantInvitations]);

  const invitations = invitationsData?.data || [];

//   const filteredInvitations = useMemo(() => {
//     return invitations.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
//   }, [invitations]);

//   useEffect(() => {
//     if (filteredInvitations.length > 0 && !selectedInvitation) {
//       setSelectedInvitation(filteredInvitations[0]);
//     }
//   }, [filteredInvitations, selectedInvitation]);

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
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <InvitationSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="p-4 text-center text-red-500">
            Error loading invitations. Please try again later.
          </div>
        ) : (
          <ul className="space-y-3">
            {invitations && invitations?.map((invitation) => (
              <li key={invitation.id}>
                <InvitationListItem
                  invitation={invitation}
                  isSelected={selectedInvitation?.id === invitation.id}
                  onClick={() => setSelectedInvitation(invitation)}
                />
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default InvitationsRightBar;
