'use client'
import { useGetUser } from "@/_lib/hooks/getUser";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect } from "react";

const UserNav = () => {
    const { isLoading, error, data: user } = useGetUser()
    // useEffect(() => {
    //     console.log('**********', user, error)
    // }, [user, error])

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="w-full flex justify-between items-center px-6 py-5">
            <h1 className="text-lavender-blush-600 font-black text-3xl">SOHOJOG</h1>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading user data</p>
                ) : user ? (
                    <div className="flex items-center space-x-3">
                        <Avatar className="border-2 size-10 rounded-full overflow-hidden">
                            <AvatarImage src={user.profilePicture?.minUrl || undefined} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{user.name}</span>
                    </div>
                ) : null}
            </div>
        </div>
    )
};

export default UserNav;