"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

const DashboardSection = ({ title, items }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
            {title}
        </h2>
        <ul className="space-y-3 pl-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-start group">
                    <span className="text-teal-500 mr-3 mt-1.5 transform group-hover:translate-x-1 transition-transform">
                        <ArrowRight size={16} />
                    </span>
                    <div>
                        <Link
                            href={item.link}
                            className="text-lg font-medium text-gray-700 hover:text-teal-600 transition-colors flex items-center gap-2"
                        >
                            {item.label}
                        </Link>
                        {item.description && (
                            <p className="text-sm text-gray-500 mt-0.5 ml-0">
                                <span className="text-teal-400 font-mono mr-2">-{'>'}</span>
                                {item.description}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

const DefaultDashboard = () => {
    const roleItems = [
        { label: "Home Page Content", link: "/publisher/role?page=home_content", description: "To insert content on Home Page." },
        { label: "Approve Reviewers", link: "/publisher/role?page=approve_reviewers", description: "Shows list of new reviewers from which publisher can approve or decline reviewers." },
        { label: "Approve Editors", link: "/publisher/role?page=approve_editors", description: "Shows list of new editors from which publisher can approve or decline editors." },
        { label: "New Submission", link: "/publisher/role?page=new_submissions", description: "Shows list of submitted papers which you can assign to reviewer/accept/reject." },
        { label: "Under Review", link: "/publisher/role?page=under_review", description: "Shows list of papers which are under review." },
        { label: "Approved By Reviewer", link: "/publisher/role?page=approved_reviewers", description: "Shows list of papers under approved by reviewer which you can accept/reject." },
        { label: "Minor Reject", link: "/publisher/role?page=minor_reject", description: "Shows list of papers which are minor rejected by reviewer." },
        { label: "Accepted Papers", link: "/publisher/role?page=accepted_papers", description: "Shows list of papers which are unpaid(accepted)/paid (which you can publish)." },
        { label: "Rejected Papers", link: "/publisher/role?page=rejected_papers", description: "Shows list of papers which are completely rejected by reviewer or publisher." },
        { label: "Published Papers", link: "/publisher/role?page=published_papers", description: "Shows list of papers which are published by publisher." },
        { label: "Refundable Payments", link: "/publisher/role?page=refundable", description: "Shows all payments that require refunds and allows you to initiate refund requests." },
        { label: "Issue Certificate", link: "/publisher/role?page=issue_certificate", description: "Allows to issue certificate for publish papers." },
        { label: "Manage Home Page Content", link: "/publisher/role?page=manage_home_content", description: "Allow you to manage home page content." },
        { label: "Manage Home Page Icons", link: "/publisher/role?page=manage_home_icons", description: "Allow you to mange home page icons." },
    ];

    const authorItems = [
        { label: "List of Authors which you can manage.", link: "/publisher/authors", description: "" }
    ];

    const reviewerItems = [
        { label: "List of Reviewers which you can manage.", link: "/publisher/reviewers", description: "" }
    ];

    const editorItems = [
        { label: "List of Editors which you can manage.", link: "/publisher/editors", description: "" }
    ];

    const responseItems = [
        { label: "Show the list of Responses/Feedbacks.", link: "/publisher/responses", description: "" }
    ];

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-teal-700 mb-8 pb-4 border-b border-gray-200">
                Home
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <DashboardSection title="Roles(Publisher)" items={roleItems} />
                </div>

                <div className="space-y-8">
                    <DashboardSection title="Authors" items={authorItems} />
                    <DashboardSection title="Reviewers" items={reviewerItems} />
                    <DashboardSection title="Editors" items={editorItems} />
                    <DashboardSection title="Responses" items={responseItems} />
                </div>
            </div>
        </div>
    );
};

export default DefaultDashboard;