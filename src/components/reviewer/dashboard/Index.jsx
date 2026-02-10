"use client";
import React from 'react';

import DashboardSection from '@/components/author/dashboard/Dashboard';


const ReviewerDashboard = () => {
    const roleItems = [
        { label: "Invitation for Reviewing", link: "/reviewer/role?page=invitation_for_reviewing", description: "View and manage new invitations to review papers." },
        { label: "Received For Review", link: "/reviewer/role?page=received_papers", description: "List of papers currently assigned to you for review." },
        { label: "Approved Papers", link: "/reviewer/role?page=approved_papers", description: "View papers you have approved." },
        { label: "Minor Rejected Papers", link: "/reviewer/role?page=minor_rejected_papers", description: "View papers you sent back for minor revisions." },
        { label: "Rejected Papers", link: "/reviewer/role?page=rejected_papers", description: "View papers you have rejected." },
        { label: "Deadline Expired Papers", link: "/reviewer/role?page=deadline_expired_papers", description: "View papers where the review deadline has passed." },
    ];

    const guidelinesItems = [
        { label: "Reviewer Guidelines", link: "#", description: "Read the guidelines for reviewing papers." }, // Placeholder
        { label: "Review Process", link: "#", description: "Learn about the review workflow." }
    ];

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-teal-700 mb-8 pb-4 border-b border-gray-200">
                Home
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <DashboardSection title="Roles(Reviewer)" items={roleItems} />
                </div>
                <div>
                    <DashboardSection title="Guidelines & Info" items={guidelinesItems} />
                </div>
            </div>
        </div>
    );
};

export default ReviewerDashboard;
