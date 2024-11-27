'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserPlus, Users, ListTodo, CalendarPlus, MessageSquarePlus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface ActionButtonProps {
    icon: ReactNode;
    tooltip: string;
    onClick: () => void;
}

const ActionButton = ({ icon, tooltip, onClick }: ActionButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-iceMint-100 transition-colors duration-200"
                    onClick={onClick}
                >
                    {icon}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export const QuickActionBar = () => {
    const router = useRouter();
    const params = useParams<{ projectId: string }>();


    const createTaskHandler = () => {
        if (params.projectId) {
            router.push(`${params.projectId}/create-task`);
        } else {
            console.error('Project ID is missing.');
        }
    };

    return (
        <TooltipProvider>
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-xl shadow-gray-300 py-3 px-4 flex items-center gap-4 border-2 border-iceMint-200">
                <ActionButton icon={<Users size={24} strokeWidth={3} />} tooltip="Create Team" onClick={() => console.log('Create Team')} />
                <ActionButton icon={<UserPlus size={24} strokeWidth={3} />} tooltip="Invite Participant" onClick={() => console.log('Invite Participant')} />
                <ActionButton icon={<ListTodo size={24} strokeWidth={3} />} tooltip="Create Task" onClick={createTaskHandler} />
                <ActionButton icon={<CalendarPlus size={24} strokeWidth={3} />} tooltip="Schedule Meeting" onClick={() => console.log('Schedule Meeting')} />
                <ActionButton icon={<MessageSquarePlus size={24} strokeWidth={3} />} tooltip="Start Discussion" onClick={() => console.log('Start Discussion')} />
            </div>
        </TooltipProvider>
    );
};
