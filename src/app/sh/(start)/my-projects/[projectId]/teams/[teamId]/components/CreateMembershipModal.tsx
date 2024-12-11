'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import debounce from 'lodash/debounce'
import { useGetManagerParticipationsQuery } from '@/_lib/redux/api/api-features/roles/manager/manager-participation/manager.participation.api'
import { useCreateTeamMembershipMutation } from '@/_lib/redux/api/api-features/roles/manager/manager-team-membership/manager.team.membership.api'
import { successAlert } from '@/components/alerts/successAlert'
import { errorAlert } from '@/components/alerts/errorAlert'

const formSchema = z.object({
    purpose: z.string().max(500, "Purpose cannot exceed 500 characters").optional(),
    responsibilities: z.array(z.string().max(30, "Each responsibility cannot exceed 30 characters")).min(1, "At least one responsibility is required").max(6, "Cannot have more than 6 responsibilities"),
})

type FormSchema = z.infer<typeof formSchema>

export function CreateMembershipModal({ teamId, projectId }: { teamId: string, projectId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [participantSearch, setParticipantSearch] = useState("")
    const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null)
    const [page, setPage] = useState(1)
    const [responsibilities, setResponsibilities] = useState([""]);
    const limit = 6

    const { data: participationsData, isLoading, isFetching } = useGetManagerParticipationsQuery({
        searchTerm: isOpen ? participantSearch : "",
        page,
        limit,
        excludeTeam: teamId,
        projectId
    }, {
        skip: !isOpen
    })

    const [createTeamMembership, { isLoading: createMemberLoading }] = useCreateTeamMembershipMutation()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            purpose: '',
            responsibilities: [''],
        },
    })


    const handleAddResponsibility = () => {
        setResponsibilities([...responsibilities, ""]);
    };

    const handleRemoveResponsibility = (index: number) => {
        const newResponsibilities = responsibilities.filter((_, i) => i !== index);
        setResponsibilities(newResponsibilities);
    };

    const handleResponsibilityChange = (index: number, value: string) => {
        const newResponsibilities = [...responsibilities];
        newResponsibilities[index] = value;
        setResponsibilities(newResponsibilities);
    };

    const onSubmit = async (data: FormSchema) => {
        if (!selectedParticipant) {
            errorAlert({
                title: "Error",
                description: "Please select a participant",
            })
            return
        }

        const requestData = {
            ...data,
            teamId,
            participationId: selectedParticipant.id,
            responsibilities,
        }

        // console.log('submitting', requestData);

        try {
            const response = await createTeamMembership(requestData).unwrap()
            successAlert({
                title: 'Success',
                description: "New team member added successfully",
            })
            setIsOpen(false)
            form.reset()
            setResponsibilities([""]);
            setSelectedParticipant(null)
        } catch (err) {
            const axiosError = err as { data: { message?: string }, status: number }
            const errorMessage = axiosError?.data?.message || 'Failed to add team member'
            errorAlert({
                title: "Failed",
                description: errorMessage,
            })
        }
    }

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setParticipantSearch(value)
            setPage(1)
        }, 300),
        []
    )

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
                setParticipantSearch("")
                setPage(1)
                form.reset()
                setSelectedParticipant(null)
                setResponsibilities([""]);
            }
        }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Team Member</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {!selectedParticipant ? (
                            <div className="space-y-4">
                                <Input
                                    placeholder="Search available participants..."
                                    onChange={(e) => debouncedSearch(e.target.value)}
                                    onFocus={() => setIsOpen(true)}
                                />
                                <ScrollArea className="h-[200px] rounded-md border p-4">
                                    {isLoading || isFetching ? (
                                        <div>Loading...</div>
                                    ) : participationsData?.data.participations.map(participation => (
                                        <div key={participation.id} className="flex items-center justify-between py-2">
                                            <div className="flex items-center">
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage src={participation.user.profilePicture?.minUrl} alt={participation.user.name} />
                                                    <AvatarFallback>{participation.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium">{participation.user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{participation.designation.join(', ')}</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setSelectedParticipant(participation)}
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    ))}
                                </ScrollArea>
                                <div className="flex justify-between items-center">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span>Page {page}</span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage(prev => prev + 1)}
                                        disabled={participationsData?.data?.pagination?.currentPage === participationsData?.data?.pagination?.totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src={selectedParticipant.user.profilePicture?.minUrl} alt={selectedParticipant.user.name} />
                                            <AvatarFallback>{selectedParticipant.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{selectedParticipant.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{selectedParticipant.designation.join(', ')}</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedParticipant(null)}
                                    >
                                        Change
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <label className="block">Purpose (Optional)</label>
                                    <Textarea
                                        placeholder="Enter the purpose of adding this member..."
                                        {...form.register('purpose')}
                                    />
                                </div>
                                <div>
                                    <label className="block">Responsibilities</label>
                                    <div className="space-y-2">
                                        {responsibilities.map((responsibility, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Input
                                                    value={responsibility}
                                                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                                                    className="flex-grow"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleRemoveResponsibility(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {responsibilities.length < 6 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleAddResponsibility}
                                                className="w-full"
                                            >
                                                <Plus className="h-4 w-4 mr-2" /> Add Responsibility
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={createMemberLoading || !selectedParticipant}>
                                    Add Member
                                </Button>
                            </>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}