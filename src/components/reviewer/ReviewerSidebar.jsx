"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    Home,
    Mail,
    CheckSquare,
    AlertTriangle,
    XCircle,
    Clock,
    User
} from 'lucide-react';

const ReviewerSidebar = () => {
    const searchParams = useSearchParams();
    const currentPage = searchParams.get('page') || 'invitation_for_reviewing';

    const sidebarLinks = [
        { label: "Invitation for Reviewing", page: "invitation_for_reviewing", icon: User },
        { label: "Received For Review", page: "received_papers", icon: Mail },
        { label: "Approved Papers", page: "approved_papers", icon: CheckSquare },
        { label: "Minor Rejected Papers", page: "minor_rejected_papers", icon: AlertTriangle },
        { label: "Rejected Papers", page: "rejected_papers", icon: XCircle },
        { label: "Deadline Expired Papers", page: "deadline_expired_papers", icon: Clock },
    ];

    return (
        <aside className=" lg:w-64 bg-gray-100 border-r border-gray-200 h-fit mt-5 md:mt-10">
            <nav className="flex flex-col py-1">
                {sidebarLinks.map((link, index) => {
                    const isActive = currentPage === link.page;
                    return (
                        <Link
                            key={index}
                            href={`/reviewer/role?page=${link.page}`}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${isActive
                                ? "bg-white border-secondary text-gray-900"
                                : "border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                }  border-gray-200`}
                        >
                            <link.icon className={`w-4 h-4 ${isActive ? "text-secondary" : "text-gray-500"}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default ReviewerSidebar;
