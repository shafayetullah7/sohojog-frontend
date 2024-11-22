import { Skeleton } from "@/components/ui/skeleton";

const InvitationListItemSkeleton = () => (
    <div className="flex items-center space-x-4 p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>
);
export default InvitationListItemSkeleton