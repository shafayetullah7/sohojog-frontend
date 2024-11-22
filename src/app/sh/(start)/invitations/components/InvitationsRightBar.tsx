'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import InvitationListItem from "./InvitationListItem";
import { useEffect, useState } from "react";
import { useGetParticipantInvitationsQuery } from "@/_lib/redux/api/api-features/roles/participant/invitation/my.invitations.api";
import { GetParticipantInvitationsQueryParams } from "@/_lib/redux/api/api-features/roles/participant/invitation/dto/getInvitations/get.invitation.query.dto";
import InvitationListItemSkeleton from "./InvitationIListItemSkeletong";
import Link from "next/link";
import { useParams } from "next/navigation";

const InvitationsRightBar = () => {
  const [filter, setFilter] = useState<'All' | 'PENDING' | 'ACCEPTED' | 'DECLINED'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState<GetParticipantInvitationsQueryParams>({
    projectId: undefined,
    status: undefined,
    invitedBy: undefined,
    date: undefined,
    month: undefined,
    year: undefined,
    beforeDate: undefined,
    afterDate: undefined,
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'asc',
    searchTerm: undefined,
  });

  const params = useParams();
  const { invitationId } = params as { invitationId: string };



  // API query hook
  const { data: invitationsData, isLoading, isError } =
    useGetParticipantInvitationsQuery(queryParams);



  // Update queryParams whenever filter or searchTerm changes
  useEffect(() => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      status: filter === 'All' ? undefined : filter,
      searchTerm: searchTerm || undefined,
      page,
    }));
  }, [filter, searchTerm, page]);

  return (
    <div className="w-full bg-white rounded-3xl p-2">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-2">Invitations</h2>
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
      <ScrollArea className="h-[calc(100vh-8.5rem)] mt-3">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <InvitationListItemSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="p-4 text-center text-red-500">
            Error loading invitations. Please try again later.
          </div>
        ) : (
          <ul className="space-y-3">
            {invitationsData && invitationsData.data.invitations?.map((invitation) => (
              <li key={invitation.id}>
                <Link href={`/sh/invitations/${invitation.id}`}>
                  <InvitationListItem
                    invitation={invitation}
                    // isSelected={selectedInvitation?.id === invitation.id}
                    isSelected={invitation.id === invitationId}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default InvitationsRightBar;
