import React from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock, DollarSign, CheckCircle2, Calendar, Users, TrendingUp } from 'lucide-react'
import ProjectInfoBar from './my-project-components/ProjectInfoBar'
import { TasksSection } from './my-project-components/TasksSection'
import { InvitationsSection } from './my-project-components/InvitationSection'
import { MeetingsSection } from './my-project-components/MeetingsSection'
import MyProjectParticipants from './my-project-components/MyProjectParticipants'
import MyProjectTeams from './my-project-components/MyProjectTeams'
import { QuickActionBar } from './my-project-components/QuickActionBar'

const projectData = {
    progress: 65,
    totalHours: 1240,
    budget: 150000,
    tasks: Array(100).fill(null).map((_, i) => ({ status: i < 72 ? 'Completed' : 'In Progress' })),
    startDate: '2023-01-15',
    endDate: '2023-12-31',
    teamSize: 12,
    budgetSpent: 97500,
}



export default function ProjectDetailsLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br ">
            <div className="container mx-auto px-4 py-8">
                {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">Project Dashboard</h1> */}
                <ProjectInfoBar />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <TasksSection />
                        <InvitationsSection />
                        <MeetingsSection />
                    </div>
                    <div className="space-y-6">
                        <MyProjectParticipants />
                        <MyProjectTeams />
                    </div>
                </div>
            </div>
            <QuickActionBar />

        </div>
    )
}


{/* <div className="lg:w-2/5 space-y-8">

<MyProjectParticipants></MyProjectParticipants>
<MyProjectTeams></MyProjectTeams>
</div> */}