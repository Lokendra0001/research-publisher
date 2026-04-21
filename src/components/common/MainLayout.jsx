"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/common/Sidebar";

export default function MainLayout({ children }) {
    const pathname = usePathname();
    // Check if the current path starts with any of the role-based routes
    const isRolePage =
        pathname?.startsWith("/author") ||
        pathname?.startsWith("/publisher") ||
        pathname?.startsWith("/reviewer") ||
        pathname?.startsWith("/view_more_action") ||
        pathname?.startsWith("/temp")
        ;

    if (isRolePage) {
        // Render full width without global sidebar for role pages
        return (
            <div className="max-w-7xl mx-auto px-4">
                {children}
            </div>
        );
    }

    // Render with global sidebar for guest/public pages
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
            <div className="lg:col-span-3">
                {children}
            </div>
            <div className="lg:col-span-1 mt-15">
                <Sidebar />
            </div>
        </div>
    );
}
