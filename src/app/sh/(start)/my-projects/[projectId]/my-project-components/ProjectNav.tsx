"use client";

import { useState, useMemo, ForwardRefExoticComponent, RefAttributes } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Users,
  CheckSquare,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  LucideProps,
} from "lucide-react";
import { cn } from "@/_lib/utils";

type NavItems = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

const navItems: NavItems[] = [
  { name: "Overview", href: "", icon: Home },
  { name: "Teams", href: "teams", icon: Users },
  { name: "Tasks", href: "tasks", icon: CheckSquare },
  { name: "Files", href: "files", icon: FileText },
  { name: "Calendar", href: "calendar", icon: Calendar },
  { name: "Discussions", href: "discussions", icon: MessageSquare },
  { name: "Settings", href: "settings", icon: Settings },
];

export default function ProjectNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams<{ projectId: string }>();
  const pathname = usePathname();

  // Corrected activeNavItem logic
  const activeNavItem = useMemo(() => {
    return navItems.find((item) => {
      const fullPath = `/sh/my-projects/${params.projectId}/${item.href}`;
      return pathname === fullPath || pathname.startsWith(`${fullPath}/`);
    });
  }, [pathname, params.projectId]);

  // Render function for links
  const renderNavLink = (item: NavItems) => {
    const fullPath = `/sh/my-projects/${params.projectId}/${item.href}`;
    const isActive = pathname === fullPath || pathname.startsWith(`${fullPath}/`);

    return (
      <Link
        key={item.name}
        href={fullPath}
        className={cn(
          isActive
            ? "bg-iceMint-100 text-iceMint-700"
            : "text-gray-600 hover:bg-iceMint-50 hover:text-iceMint-800",
          "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-150 ease-in-out"
        )}
      >
        <item.icon className="w-5 h-5 mr-2" />
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                {navItems.map(renderNavLink)}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-iceMint-500 hover:bg-iceMint-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-iceMint-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name} className="block">
                {renderNavLink(item)}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
