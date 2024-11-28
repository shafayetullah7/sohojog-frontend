"use client"
import { BookTextIcon, BriefcaseIcon, Globe2Icon, GridIcon, Hand, HomeIcon, Inbox, MessageSquareIcon, UserIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation";


type NavItem = {
    title: string;
    route: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}



const navItems: NavItem[] = [
    {
        title: 'Home',
        route: '/',
        icon: HomeIcon,
    },
    {
        title: 'Dashboard',
        route: '/dashboard',
        icon: GridIcon,
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
    {
        title: 'Profile',
        route: '/profile',
        icon: UserIcon,
    },
    {
        title: 'Feeds',
        route: '/feeds',
        icon: BookTextIcon,
    },
    {
        title: 'Inbox',
        route: '/inbox',
        icon: MessageSquareIcon,
    },
    {
        title: 'My Workspace',
        route: '/workspace',
        icon: Globe2Icon,
    },
];
const Sidebar = () => {
    const pathname = usePathname();

    // console.log("********", pathname)

    const isActive = (path: string) => {
        const sections = pathname.split('/');
        const target = sections[2];

        const matcher = `/${target ? target : ''}`

        return path === matcher;
    }


    // console.log(userId)

    const [retracted, setRetracted] = useState<boolean>(false);
    const togggleLeftBarRetraction = () => {
        setRetracted((retracted) => !retracted)
    }


    return (
        <div className={`py-0 px-4  ${retracted ? 'w-28' : 'w-1/5'} transition-all duration-300 overflow-hidden`}>
            <div className={`flex flex-nowrap items-center justify-start space-x-4 mx-6 rounded-2xl text-gray-800`}>
                {/* <div className="cursor-pointer" onClick={togggleLeftBarRetraction}><MenuIcon className="size-8" aria-hidden="true"></MenuIcon></div> */}
                {/* <div className={`cursor-pointer ${retracted ? 'rotate-0' : 'rotate-180'} transition-all duration-1000`} onClick={togggleLeftBarRetraction}>
                    {retracted ? <MenuIcon className="size-8" aria-hidden="true"></MenuIcon> : <XIcon className="size-8" aria-hidden="true"></XIcon>}
                </div> */}
                <div className={`cursor-pointer transition-all duration-500`} onClick={togggleLeftBarRetraction}>
                    {/* <ChevronRight className="size-8" aria-hidden="true"></ChevronRight> */}
                    {/* {retracted ? <MenuIcon className="size-8" aria-hidden="true"></MenuIcon> : <XIcon className="size-8" aria-hidden="true"></XIcon>} */}
                    <MenuIcon className="size-8" aria-hidden="true"></MenuIcon>
                </div>
            </div>
            <div className="mt-8">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.route}>
                            {retracted ? <TooltipProvider delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link prefetch={true} href={`/sh/${item.route}`} className={`${isActive(item.route) ? 'bg-lavender-blush-600 text-white hover:bg-lavender-blush-600' : ' hover:bg-gray-50'} flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-xl text-gray-800 font-medium overflow-hidden`}>
                                            <div><item.icon className="size-6" aria-hidden="true" /></div>
                                            {!retracted && <p className="text-nowrap">{item.title}</p>}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p className="text-slate-500">{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider> : <Link prefetch={true} href={`/sh/${item.route}`} className={`${isActive(item.route) ? 'bg-lavender-blush-600 text-white hover:bg-lavender-blush-600' : 'hover:bg-gray-50'} flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-xl text-gray-800 font-medium overflow-hidden`}>
                                <div><item.icon className="size-6" aria-hidden="true" /></div>
                                {!retracted && <p className="text-nowrap">{item.title}</p>}
                            </Link>}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;