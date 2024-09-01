
import { BookText, BookTextIcon, Globe2Icon, GridIcon, HomeIcon, MessageSquareIcon, UserIcon } from "lucide-react";
import Link from "next/link";

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

    return (
        <div>
            <ul>
                {navItems.map((item) => (
                    <li key={item.route}>
                        <Link href={item.route} className="flex items-center space-x-2 p-2">
                            {/* Render the icon */}
                            <item.icon className="w-6 h-6" aria-hidden="true" />
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;