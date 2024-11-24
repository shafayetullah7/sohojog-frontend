"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Save, X } from 'lucide-react'
import { useCreateTeamMutation } from "@/_lib/redux/api/api-features/roles/manager/manager-team/manager.team.api"
import { errorAlert } from "@/components/alerts/errorAlert"
import { successAlert } from "@/components/alerts/successAlert"
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType"

const createTeamSchema = z.object({
    name: z.string().min(1, "Team name is required"),
    purpose: z.string().min(1, "Team purpose is required"),
    responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
})

type CreateTeamFormValues = z.infer<typeof createTeamSchema>

type CreateTeamDialogProps = {
    projectId: string
}

export default function CreateTeamDialog({ projectId }: CreateTeamDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [createNewTeam, { isLoading }] = useCreateTeamMutation()

    const form = useForm<CreateTeamFormValues>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            name: "",
            purpose: "",
            responsibilities: [""],
        },
    })

    const handleSubmit = async (data: CreateTeamFormValues) => {
        const requestData = { projectId, ...data };

        try {
            const response = await createNewTeam(requestData).unwrap();
            if (response.success) {
                successAlert({ title: 'Success', description: 'New Team Created' });
            } else {
                throw new Error("Faile to create team")
            }

            form.reset();

            setOpen(false); // Close the modal or form

            // console.log("Team created successfully:", response);
        } catch (err) {
            const axiosError = err as { data: TerrorResponse, status: number };
            const errorMessage = axiosError?.data?.message || 'Failed to create team';

            const error = { title: 'Failed', description: errorMessage };

            errorAlert(error);
            // console.error("Error creating team:", err);
        }
    };


    const addResponsibility = () => {
        const responsibilities = form.getValues("responsibilities")
        const newResponsibility = responsibilities[responsibilities.length - 1].trim()
        if (newResponsibility && responsibilities.length < 10) {
            form.setValue("responsibilities", [...responsibilities.slice(0, -1), newResponsibility, ""])
        }
    }

    const removeResponsibility = (index: number) => {
        const responsibilities = form.getValues("responsibilities")
        form.setValue("responsibilities", responsibilities.filter((_, i) => i !== index))
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <button
                    onClick={() => setOpen(true)}
                    className="gradient-button-secondary flex items-center justify-between text-xs font-bold"
                >
                    <Plus className="h-4 w-4 mr-2" /> Create New Team
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new team. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter team name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Purpose</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter team purpose"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="responsibilities"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Responsibilities</FormLabel>
                                    <div className="mt-2 mb-2 flex flex-wrap gap-2">
                                        {field.value.slice(0, -1).map((responsibility, index) => (
                                            <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
                                                <span className="mr-1">{responsibility}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-4 w-4 p-0"
                                                    onClick={() => removeResponsibility(index)}
                                                >
                                                    <X className="h-3 w-3" />
                                                    <span className="sr-only">Remove responsibility</span>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <FormControl>
                                        <div className="flex items-center justify-between gap-2">
                                            <Input
                                                placeholder="Add a responsibility"
                                                value={field.value[field.value.length - 1]}
                                                onChange={(e) => {
                                                    const newValue = [...field.value.slice(0, -1), e.target.value]
                                                    form.setValue("responsibilities", newValue)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault()
                                                        addResponsibility()
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                onClick={addResponsibility}
                                                className="btn-gradient animate-gradient p-2 h-auto"
                                                aria-label="Add responsibility"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} className="btn-gradient animate-gradient w-full">
                            <Save className="w-4 h-4 mr-2" />
                            Save Team
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}