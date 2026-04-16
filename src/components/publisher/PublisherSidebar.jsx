"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Home,
  CheckSquare,
  UserCheck,
  Send,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BookOpen,
  Award,
  Settings,
  Image,
  Layout,
  RefreshCcw,
} from "lucide-react";

const PublisherSidebar = () => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "approve_reviewers";

  const sidebarLinks = [
    { label: "Home Page Content", page: "home_content", icon: Home },
    {
      label: "Approve Reviewers",
      page: "approve_reviewers",
      icon: CheckSquare,
    },
    { label: "New Submissions", page: "new_submissions", icon: Send },
    {
      label: "Rejected Invitations",
      page: "rejected_invitations",
      icon: XCircle,
    },
    { label: "Under Review", page: "under_review", icon: Clock },
    { label: "Minor Reject", page: "minor_reject", icon: AlertTriangle },
    { label: "Accepted Papers", page: "accepted_papers", icon: CheckCircle },
    { label: "Rejected Papers", page: "rejected_papers", icon: XCircle },
    { label: "Published Papers", page: "published_papers", icon: BookOpen },
    { label: "Refundable Payments", page: "refundable", icon: RefreshCcw },
    { label: "Issue Certificate", page: "issue_certificate", icon: Award },
    {
      label: "Issued Certificate List",
      page: "issued_certificate_list",
      icon: Award,
    },
  ];

  return (
    <aside className=" lg:w-64 bg-gray-100 border-r border-gray-200 h-fit mt-5 md:mt-10">
      <nav className="flex flex-col py-1">
        {sidebarLinks.map((link, index) => {
          const isActive = currentPage === link.page;
          return (
            <Link
              key={index}
              href={`/publisher/role?page=${link.page}`}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                isActive
                  ? "bg-primary-foreground border-secondary text-text-primary"
                  : "border-transparent text-text-primary/60 hover:bg-border hover:text-text-primary"
              }  border-gray-200`}
            >
              <link.icon
                className={`w-4 h-4 ${isActive ? "text-secondary" : "text-text-primary/50"}`}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default PublisherSidebar;
