"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { WalletIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateProjectWalletMutation } from '@/_lib/redux/api/api-features/roles/manager/manager-project-wallet/managerProjectWalletApi'
import { Currencies } from '@/_lib/redux/api/api-features/roles/manager/manager-project-wallet/dto/enable-wallet/types'
import { useParams } from 'next/navigation'

export const walletFormSchema = z.object({
    balance: z
        .string()
        .min(1, { message: "Balance is required" })
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "Balance must be a non-negative number",
        }),
    estimatedBudget: z
        .string()
        .min(1, { message: "Estimated budget is required" })
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
            message: "Estimated budget must be a non-negative number",
        }),
    currency: z.nativeEnum(Currencies, {
        required_error: "Please select a currency",
        invalid_type_error: "Invalid currency selected",
    }),
});

type WalletFormValues = z.infer<typeof walletFormSchema>

export default function WalletEnableDialog() {
    const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)
    const params = useParams<{ projectId: string }>();
    const [enableWallet, { isLoading, isError }] = useCreateProjectWalletMutation()

    const form = useForm<WalletFormValues>({
        resolver: zodResolver(walletFormSchema),
        defaultValues: {
            balance: "0",
            estimatedBudget: "0",
            currency: "BDT",
        },
    })

    const handleEnableWallet = async (data: WalletFormValues) => {
        try {
            if (!params.projectId) {
                throw new Error("Project ID not found.")
            }
            await enableWallet({
                balance: Number(data.balance),
                estimatedBudget: Number(data.estimatedBudget),
                currency: data.currency,
                projectId: params.projectId
            }).unwrap();

            console.log("Wallet enabled successfully with balance:", data.balance, "estimated budget:", data.estimatedBudget, "and currency:", data.currency);
            setIsWalletDialogOpen(false);
        } catch (error) {
            console.error("Error enabling wallet:", error);
        }
    };

    return (
        <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                    <WalletIcon className="w-4 h-4 mr-2" />
                    Enable Wallet
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enable Project Wallet</DialogTitle>
                    <DialogDescription>
                        Set up a wallet to manage the budget for this project.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleEnableWallet)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="balance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Balance</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} min="0" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estimatedBudget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estimated Budget</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} min="0" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.entries(Currencies).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>
                                                    {value}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Enabling...' : 'Enable Wallet'}
                        </Button>
                        {isError && <p className="text-red-500">Error enabling wallet. Please try again.</p>}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}