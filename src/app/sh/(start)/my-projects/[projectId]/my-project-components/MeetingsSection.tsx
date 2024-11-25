import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Users } from 'lucide-react'

const meetings = [
    { id: 1, title: "Sprint Planning", date: "2023-05-23", time: "10:00 AM", attendees: 8 },
    { id: 2, title: "Design Review", date: "2023-05-24", time: "2:00 PM", attendees: 5 },
    { id: 3, title: "Stakeholder Update", date: "2023-05-25", time: "11:00 AM", attendees: 12 },
]

export function MeetingsSection() {
    return (
        <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
            <CardHeader className="bg-iceMint-200 py-3">
                <CardTitle className="text-lg flex justify-between items-center">
                    <span>Meeting Schedules</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                        See All <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="divide-y divide-gray-200">
                    {meetings.map(meeting => (
                        <li key={meeting.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
                                    <p className="text-xs text-gray-500">{meeting.date} at {meeting.time}</p>
                                </div>
                                <Badge variant="outline" className="text-xs flex items-center">
                                    <Users className="w-3 h-3 mr-1" />
                                    {meeting.attendees}
                                </Badge>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}