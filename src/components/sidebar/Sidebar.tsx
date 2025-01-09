"use client"

import { BookTextIcon, BriefcaseIcon, Globe2Icon, GridIcon, Hand, HomeIcon, Inbox, LogOutIcon, MessageSquareIcon, UserIcon } from 'lucide-react'
import { MenuIcon } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { LocalStorageService } from '@/_lib/helpers/access/Access'

type NavItem = {
    title: string
    route: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}



const navItems: NavItem[] = [
    {
        title: 'Home',
        route: '/',
        icon: HomeIcon,
    },
    {
        title: 'Projects',
        route: '/my-projects',
        icon: BriefcaseIcon,
    },
    {
        title: 'My Participations',
        route: '/my-participations',
        icon: Hand,
    },
    {
        title: 'Invitations',
        route: '/invitations',
        icon: Inbox,
    },
    // {
    //     title: 'Profile',
    //     route: '/profile',
    //     icon: UserIcon,
    // },
    {
        title: 'Inbox',
        route: '/inbox',
        icon: MessageSquareIcon,
    },
]

const Sidebar = () => {
    const pathname = usePathname()
    const [retracted, setRetracted] = useState<boolean>(false);
    const router = useRouter();

    const isActive = (path: string) => {
        const sections = pathname.split('/')
        const target = sections[2]
        const matcher = `/${target ? target : ''}`
        return path === matcher
    }

    const toggleLeftBarRetraction = () => {
        setRetracted((retracted) => !retracted)
    }

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logging out...");

        const localStorage = LocalStorageService.getInstance().deleteTokens();
        router.replace('/sign-in')

    }

    return (
        <div className={`py-0 px-4 flex flex-col h-screen ${retracted ? 'w-28' : 'w-1/5'} transition-all duration-300`}>
            <div className={`flex flex-nowrap items-center justify-start space-x-4 mx-6 rounded-2xl text-gray-800 py-4`}>
                <div className={`cursor-pointer transition-all duration-500`} onClick={toggleLeftBarRetraction}>
                    <MenuIcon className="size-8" aria-hidden="true" />
                </div>
            </div>
            <div className="mt-8 flex-grow overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.route}>
                            {retracted ? (
                                <TooltipProvider delayDuration={300}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                prefetch={true}
                                                href={`/sh${item.route}`}
                                                className={`${isActive(item.route)
                                                        ? 'bg-lavender-blush-600 text-white hover:bg-lavender-blush-600'
                                                        : 'hover:bg-gray-50'
                                                    } flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-xl text-gray-800 font-medium overflow-hidden`}
                                            >
                                                <div><item.icon className="size-6" aria-hidden="true" /></div>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            <p className="text-slate-500">{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <Link
                                    prefetch={true}
                                    href={`/sh${item.route}`}
                                    className={`${isActive(item.route)
                                            ? 'bg-lavender-blush-600 text-white hover:bg-lavender-blush-600'
                                            : 'hover:bg-gray-50'
                                        } flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-xl text-gray-800 font-medium overflow-hidden`}
                                >
                                    <div><item.icon className="size-6" aria-hidden="true" /></div>
                                    <p className="text-nowrap">{item.title}</p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-auto py-4">
                {retracted ? (
                    <TooltipProvider delayDuration={300}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start p-5 mx-2 rounded-xl text-gray-800 font-medium"
                                    onClick={handleLogout}
                                >
                                    <LogOutIcon className="size-6" aria-hidden="true" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p className="text-slate-500">Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <Button
                        variant="ghost"
                        className="w-full justify-start p-5 mx-2 rounded-xl text-gray-800 font-medium"
                        onClick={handleLogout}
                    >
                        <LogOutIcon className="size-6 mr-4" aria-hidden="true" />
                        Logout
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Sidebar

