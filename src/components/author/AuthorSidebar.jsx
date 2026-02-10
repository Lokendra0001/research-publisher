"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    Send,
    Search,
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    BookOpen,
    Award
} from 'lucide-react';

const AuthorSidebar = () => {
    const searchParams = useSearchParams();
    const currentPage = searchParams.get('page') || 'new_submission';

    const sidebarLinks = [
        { label: "New Submission", page: "new_submission", icon: Send },
        { label: "Check Status", page: "check_status", icon: Search },
        { label: "Submitted Papers", page: "submitted_papers", icon: FileText },
        { label: "Under Review", page: "under_review", icon: Clock },
        { label: "Accepted Papers", page: "accepted_papers", icon: CheckCircle },
        { label: "Minor Rejected Papers", page: "minor_rejected", icon: AlertCircle },
        { label: "Rejected Papers", page: "rejected_papers", icon: XCircle },
        { label: "Published Papers", page: "published_papers", icon: BookOpen },
        { label: "My Certificates", page: "certificates", icon: Award },
    ];

    return (
        <aside className="lg:w-64 bg-gray-100 border-r border-gray-200 h-fit mt-5 md:mt-10">
            <nav className="flex flex-col py-4">
                {sidebarLinks.map((link, index) => {
                    const isActive = currentPage === link.page;
                    return (
                        <Link
                            key={index}
                            href={`/author/role?page=${link.page}`}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${isActive
                                ? "bg-white border-secondary text-gray-900"
                                : "border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                }`}
                        >
                            <link.icon className={`w-5 h-5 ${isActive ? "text-secondary" : "text-gray-500"}`} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AuthorSidebar;
