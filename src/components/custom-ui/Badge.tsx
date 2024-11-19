import React from "react";
import clsx from "clsx";

type BadgeProps = {
    status:
        | "low"
        | "medium"
        | "high"
        | "critical"
        | "info"
        | "success"
        | "warning"
        | "error"
        | "neutral"
        | "blocked"
        | "in-progress"
        | "completed"
        | "draft"
        | "review"
        | "approved"
        | "rejected"
        | "on-hold"
        | "active"
        | "inactive"
        | "archived"
        | "processing"
        | "pending"
        | "failed";
    children?: React.ReactNode;
    className?: string;
};

const Badge: React.FC<BadgeProps> = ({ status, children, className }) => {
    const baseStyles = "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center transition-all";

    const statusStyles: Record<string, string> = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-orange-100 text-orange-800",
        critical: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
        success: "bg-teal-100 text-teal-800",
        warning: "bg-yellow-200 text-yellow-900",
        error: "bg-rose-100 text-rose-800",
        neutral: "bg-gray-100 text-gray-800",
        blocked: "bg-purple-100 text-purple-800",
        "in-progress": "bg-indigo-100 text-indigo-800",
        completed: "bg-emerald-100 text-emerald-800",
        draft: "bg-gray-200 text-gray-700",
        review: "bg-blue-200 text-blue-900",
        approved: "bg-green-200 text-green-900",
        rejected: "bg-red-200 text-red-900",
        "on-hold": "bg-orange-200 text-orange-900",
        active: "bg-green-300 text-green-900",
        inactive: "bg-gray-300 text-gray-900",
        archived: "bg-purple-300 text-purple-900",
        processing: "bg-indigo-200 text-indigo-900",
        pending: "bg-yellow-300 text-yellow-900",
        failed: "bg-red-300 text-red-900",
    };

    return (
        <span className={clsx(baseStyles, statusStyles[status], className)}>
            {children || status.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
        </span>
    );
};

export default Badge;
