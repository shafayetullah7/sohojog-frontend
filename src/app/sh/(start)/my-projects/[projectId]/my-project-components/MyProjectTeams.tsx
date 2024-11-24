"use client";

import { format } from "date-fns";
import { Users, Briefcase, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateTeamDialog from "./create-team/CreateTeamDialog";
import { useParams } from "next/navigation";
import { useGetManagerTeamsQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-team/manager.team.api";

export default function MyProjectTeams() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { data: teamsData, isLoading, isError } = useGetManagerTeamsQuery();

  const teams = teamsData?.data?.teams || [];

  if (isLoading) {
    return <div>Loading teams...</div>;
  }

  if (isError) {
    return <div>Error loading teams. Please try again later.</div>;
  }

  return (
    <Card className="w-full  border-none text-iceMint-900 rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-iceMint-50 backdrop-blur-sm">
        <CardTitle className="text-2xl font-bold text-iceMint-900">Teams</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="bg-iceMint-100/60 text-iceMint-700 border-iceMint-200 hover:bg-iceMint-100 hover:text-iceMint-800 transition-colors"
        >
          See All
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {teams.slice(0, 3).map((team) => (
            <div
              key={`grid-${team.id}`}
              className="flex flex-col items-center justify-center p-4 bg-iceMint-100/60 backdrop-blur-sm rounded-xl hover:bg-iceMint-100/80 transition-all cursor-pointer shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-iceMint-200 mb-2">
                <Briefcase className="h-6 w-6 text-iceMint-600" />
              </div>
              <p className="text-sm font-medium text-center truncate w-full text-iceMint-900">{team.name}</p>
              <p className="text-xs text-iceMint-600">{team.counts.memberCount} members</p>
            </div>
          ))}
        </div>
        <ScrollArea className="h-[250px] pr-4">
          <ul className="space-y-3">
            {teams.map((team) => (
              <li
                key={`list-${team.id}`}
                className="flex items-center space-x-4 p-4 bg-iceMint-100/60 backdrop-blur-sm rounded-xl hover:bg-iceMint-100/80 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-iceMint-200 shrink-0">
                  <Briefcase className="h-6 w-6 text-iceMint-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-iceMint-900 truncate">{team.name}</p>
                    <ChevronRight className="h-4 w-4 text-iceMint-400" />
                  </div>
                  <p className="text-xs text-iceMint-600 mb-2">
                    Created {format(new Date(team.createdAt), "MMM d, yyyy")}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2 overflow-hidden">
                      {team.members.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="inline-block border-2 border-white w-6 h-6">
                          <AvatarImage src={member.profilePictureUrl || undefined} alt={member.userName} />
                          <AvatarFallback>{member.userName[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {team.counts.memberCount > 3 && (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-iceMint-200 text-iceMint-600 text-xs font-medium border-2 border-white">
                          +{team.counts.memberCount - 3}
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-iceMint-200 text-iceMint-700 border-iceMint-300"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      {team.counts.taskAssignmentCount} tasks
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="flex items-center justify-center mt-4">
          <CreateTeamDialog projectId={projectId} />
        </div>
      </CardContent>
    </Card>
  );
}
