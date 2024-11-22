import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRecipientInvitationDetails = () => (
    <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-32 w-full" />
        <div className="flex space-x-4 mt-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
        </div>
    </div>
)

export default SkeletonRecipientInvitationDetails;