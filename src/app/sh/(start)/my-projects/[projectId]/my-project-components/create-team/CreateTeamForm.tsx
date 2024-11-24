"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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
import { CreateTeamFormValues, createTeamSchema } from "./dto/create.team.dto"

interface CreateTeamFormProps {
    onSubmit: (values: CreateTeamFormValues) => void;
}

export function CreateTeamForm({ onSubmit }: CreateTeamFormProps) {
    const form = useForm<CreateTeamFormValues>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            name: "",
            purpose: "",
            responsibilities: [],
        },
    })

    const addResponsibility = () => {
        const newResponsibility = form.getValues("responsibilities").at(-1)?.trim()
        if (newResponsibility && form.getValues("responsibilities").length < 10) {
            const updatedResponsibilities = [...form.getValues("responsibilities").slice(0, -1), newResponsibility]
            form.setValue("responsibilities", [...updatedResponsibilities, ""])
        }
    }

    const removeResponsibility = (index: number) => {
        const updatedResponsibilities = form.getValues("responsibilities").filter((_, i) => i !== index)
        form.setValue("responsibilities", updatedResponsibilities)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                {form.getValues("responsibilities").slice(0, -1).map((responsibility, index) => (
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
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <FormControl>
                                <div className="flex items-center justify-between gap-2">
                                    <Input
                                        placeholder="Add a responsibility"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                addResponsibility()
                                            }
                                        }}
                                        value={field.value.at(-1) || ""}
                                        onChange={(e) => {
                                            const newValue = [...field.value.slice(0, -1), e.target.value]
                                            form.setValue("responsibilities", newValue)
                                        }}
                                    />
                                    <button
                                        onClick={addResponsibility}
                                        className="bg-gray-800  text-white px-2 rounded-lg py-2"
                                        aria-label="Add responsibility"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="gradient-button"><Save></Save> Save Team</Button>
            </form>
        </Form>
    )
}