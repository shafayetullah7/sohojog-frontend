import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center justify-center transition-all duration-200 shadow-sm",
  {
    variants: {
      status: {
        low: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 hover:bg-emerald-100",
        medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100",
        high: "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20 hover:bg-orange-100",
        critical: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 hover:bg-rose-100",
        info: "bg-sky-50 text-sky-700 ring-1 ring-sky-600/20 hover:bg-sky-100",
        success: "bg-green-50 text-green-700 ring-1 ring-green-600/20 hover:bg-green-100",
        warning: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 hover:bg-yellow-100",
        error: "bg-red-50 text-red-700 ring-1 ring-red-600/20 hover:bg-red-100",
        neutral: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100",
        blocked: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 hover:bg-purple-100",
        "in-progress": "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20 hover:bg-indigo-100",
        completed: "bg-teal-50 text-teal-700 ring-1 ring-teal-600/20 hover:bg-teal-100",
        draft: "bg-slate-50 text-slate-700 ring-1 ring-slate-600/20 hover:bg-slate-100",
        review: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-600/20 hover:bg-cyan-100",
        approved: "bg-lime-50 text-lime-700 ring-1 ring-lime-600/20 hover:bg-lime-100",
        rejected: "bg-pink-50 text-pink-700 ring-1 ring-pink-600/20 hover:bg-pink-100",
        "on-hold": "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100",
        active: "bg-green-50 text-green-700 ring-1 ring-green-600/20 hover:bg-green-100",
        inactive: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100",
        archived: "bg-violet-50 text-violet-700 ring-1 ring-violet-600/20 hover:bg-violet-100",
        processing: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 hover:bg-blue-100",
        pending: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 hover:bg-yellow-100",
        failed: "bg-red-50 text-red-700 ring-1 ring-red-600/20 hover:bg-red-100",
        new: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 hover:bg-emerald-100",
        updated: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 hover:bg-blue-100",
        resolved: "bg-green-50 text-green-700 ring-1 ring-green-600/20 hover:bg-green-100",
        reopened: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100",
        urgent: "bg-red-50 text-red-700 ring-1 ring-red-600/20 hover:bg-red-100",
        overdue: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 hover:bg-rose-100",
        scheduled: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20 hover:bg-indigo-100",
        cancelled: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100",
        postponed: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100",
        featured: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 hover:bg-purple-100",
        sponsored: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 hover:bg-yellow-100",
        premium: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100",
        verified: "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 hover:bg-blue-100",
        unverified: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100",
        beta: "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20 hover:bg-purple-100",
        alpha: "bg-pink-50 text-pink-700 ring-1 ring-pink-600/20 hover:bg-pink-100",
        experimental: "bg-orange-50 text-orange-700 ring-1 ring-orange-600/20 hover:bg-orange-100",
        deprecated: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100",
        maintenance: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20 hover:bg-yellow-100",
        offline: "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20 hover:bg-gray-100",
        online: "bg-green-50 text-green-700 ring-1 ring-green-600/20 hover:bg-green-100",
        away: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 hover:bg-amber-100",
        busy: "bg-red-50 text-red-700 ring-1 ring-red-600/20 hover:bg-red-100",
        free: "bg-green-50 text-green-700 ring-1 ring-green-600/20 hover:bg-green-100",
        custom: "bg-violet-50 text-violet-700 ring-1 ring-violet-600/20 hover:bg-violet-100",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-0.5",
        lg: "text-base px-3 py-1",
      },
    },
    defaultVariants: {
      status: "neutral",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, status, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={badgeVariants({ status, size, className })}
        {...props}
      >
        {children || status?.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;