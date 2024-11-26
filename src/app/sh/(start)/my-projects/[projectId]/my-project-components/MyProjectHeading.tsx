"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, CheckCircleIcon, ClockIcon, EyeIcon, TagIcon, UsersIcon, DollarSignIcon, ChevronDownIcon, ChevronUpIcon, WalletIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetManagerSingleProjectQuery } from "@/_lib/redux/api/api-features/roles/manager/manager-project-api-features/managerProjectApi";
import { TerrorResponse } from "@/_lib/redux/data-types/responseDataType";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
    PLANNING: "bg-blue-100 text-blue-800",
    ONGOING: "bg-green-100 text-green-800",
    COMPLETED: "bg-gray-100 text-gray-800",
};

const priorityColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
};

const Currency = {
    USD: "USD",
    EUR: "EUR",
    GBP: "GBP",
    JPY: "JPY",
};

type Props = {
    projectId: string;
};

const MyProjectHeading = ({ projectId }: Props) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
    const [balance, setBalance] = useState("0");
    const [currency, setCurrency] = useState(Currency.USD);
    const contentRef = useRef<HTMLDivElement>(null);
    const { data, isLoading, isError, error, isFetching } =
        useGetManagerSingleProjectQuery({ projectId });

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isExpanded
                ? `${contentRef.current.scrollHeight}px`
                : '0px';
        }
    }, [isExpanded, data]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEnableWallet = () => {
        // Implement your wallet enabling logic here
        console.log("Enabling wallet with balance:", balance, "and currency:", currency);
        setIsWalletDialogOpen(false);
    };

    if (isLoading || isFetching) {
        return (
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                </div>
            </div>
        );
    }

    if (isError) {
        const err = error as TerrorResponse;
        return (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
                <div className="text-lg font-semibold">Error</div>
                <div>{err?.message || "Error fetching project"}</div>
            </div>
        );
    }

    const project = data?.data?.project;

    if (project) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto text-gray-500 hover:text-gray-700"
                                onClick={toggleExpand}
                                aria-expanded={isExpanded}
                                aria-controls="project-details"
                            >
                                {isExpanded ? (
                                    <ChevronUpIcon className="w-5 h-5" />
                                ) : (
                                    <ChevronDownIcon className="w-5 h-5" />
                                )}
                                <span className="sr-only">{isExpanded ? 'Collapse details' : 'Expand details'}</span>
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Badge className={`${statusColors[project.status as keyof typeof statusColors]}`}>
                                {project.status}
                            </Badge>
                            <Badge className={priorityColors[project.priority as keyof typeof priorityColors]}>
                                {project.priority}
                            </Badge>
                            <Badge variant="outline" className="flex items-center">
                                <EyeIcon className="w-3 h-3 mr-1" />
                                {project.visibility}
                            </Badge>
                            {project.wallet ? (
                                <Badge variant="secondary" className="flex items-center">
                                    <DollarSignIcon className="w-3 h-3 mr-1" />
                                    {project.wallet.estimatedBudget} {project.wallet.currency}
                                </Badge>
                            ) : (
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
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="balance" className="text-right">
                                                    Balance
                                                </label>
                                                <Input
                                                    id="balance"
                                                    type="number"
                                                    value={balance}
                                                    onChange={(e) => setBalance(e.target.value)}
                                                    className="col-span-3"
                                                    min="0"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="currency" className="text-right">
                                                    Currency
                                                </label>
                                                <Select onValueChange={(value) => setCurrency(value as keyof typeof Currency)} value={currency}>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Select currency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(Currency).map(([key, value]) => (
                                                            <SelectItem key={key} value={value}>
                                                                {value}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Button onClick={handleEnableWallet}>Enable Wallet</Button>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                    <Avatar className="w-12 h-12 border-2 border-white ml-4">
                        <AvatarImage src={project.creator.profilePicture?.minUrl} alt={project.creator.name} />
                        <AvatarFallback>{project.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                <div
                    id="project-details"
                    ref={contentRef}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                >
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>
                                {project.startDate && format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
                                {project.endDate && format(new Date(project.endDate), "MMM d, yyyy")}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{project.counts.participations || 0} Participants</span>
                        </div>
                        <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{project.counts.tasks || 0} Tasks</span>
                        </div>
                    </div>

                    {project.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag: string, index: number) => (
                                <Badge key={index} variant="secondary" className="flex items-center bg-white text-gray-600">
                                    <TagIcon className="w-3 h-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default MyProjectHeading;