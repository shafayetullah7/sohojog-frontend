import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-9 w-32" /> {/* Projects title */}
                <Skeleton className="h-10 w-44 rounded-lg" /> {/* Create New Project button */}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        {/* Status Badge */}
                        <div className="flex justify-between items-start">
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>

                        {/* Project Title */}
                        <Skeleton className="h-7 w-4/5" />

                        {/* Project Description */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>

                        {/* Project Details */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" /> {/* Calendar icon */}
                                <Skeleton className="h-4 w-40" /> {/* Date range */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" /> {/* Users icon */}
                                <Skeleton className="h-4 w-32" /> {/* Participants count */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" /> {/* Tasks icon */}
                                <Skeleton className="h-4 w-24" /> {/* Tasks count */}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center pt-4">
                            {/* Participant Avatars */}
                            <div className="flex -space-x-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            {/* View Project Button */}
                            <Skeleton className="h-9 w-28 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}