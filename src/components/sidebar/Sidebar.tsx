"use client"
import { BookTextIcon, ChevronRight, Globe2Icon, GridIcon, HomeIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


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
    const [retracted, setRetracted] = useState<boolean>(false);
    const togggleLeftBarRetraction = () => {
        setRetracted((retracted) => !retracted)
    }


    return (
        <div className={`py-4 px-4  ${retracted ? 'w-28' : 'w-1/5'} transition-all duration-300 overflow-hidden`}>
            <div className={`flex flex-nowrap items-center justify-end space-x-4 mx-6 rounded-2xl text-gray-800`}>
                {/* <div className="cursor-pointer" onClick={togggleLeftBarRetraction}><MenuIcon className="size-8" aria-hidden="true"></MenuIcon></div> */}
                <div className={`cursor-pointer ${retracted ? 'rotate-0' : 'rotate-180'} transition-all duration-500`} onClick={togggleLeftBarRetraction}>
                    <ChevronRight className="size-8" aria-hidden="true"></ChevronRight>
                </div>
            </div>
            <div className="mt-8">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.route}>
                            {/* <Link href={item.route} className={`flex flex-nowrap items-center space-x-4 p-5 mx-2 my-1 rounded-2xl text-gray-800 font-medium overflow-hidden hover:bg-lavender-blush-400 hover:text-white`}>
                                <div><item.icon className="size-6" aria-hidden="true" /></div>
                                {!retracted && <p className="text-nowrap">{item.title}</p>}
                            </Link> */}
                            {
                                // <TooltipProvider>
                                //     <Tooltip>
                                //         <TooltipTrigger className="w-full">
                                //             <Link href={item.route} className={`flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-2xl text-gray-800 font-medium overflow-hidden hover:bg-lavender-blush-400 hover:text-white`}>
                                //                 <div><item.icon className="size-6" aria-hidden="true" /></div>
                                //                 {!retracted && <p className="text-nowrap">{item.title}</p>}
                                //             </Link>
                                //         </TooltipTrigger>
                                //         {retracted && <TooltipContent>
                                //             <p>Add to library</p>
                                //         </TooltipContent>}
                                //     </Tooltip>
                                // </TooltipProvider>
                            }
                            {retracted ? <TooltipProvider delayDuration={300}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link href={item.route} className={`flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-2xl text-gray-800 font-medium overflow-hidden hover:bg-lavender-blush-400 hover:text-white`}>
                                            <div><item.icon className="size-6" aria-hidden="true" /></div>
                                            {!retracted && <p className="text-nowrap">{item.title}</p>}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <p className="text-slate-500">{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider> : <Link href={item.route} className={`flex flex-nowrap items-center space-x-4 p-5 mx-2 rounded-2xl text-gray-800 font-medium overflow-hidden hover:bg-lavender-blush-400 hover:text-white`}>
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