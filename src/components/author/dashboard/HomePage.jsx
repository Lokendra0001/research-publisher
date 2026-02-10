"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DashboardSection from './Dashboard';



const HomePage = () => {
    const roleItems = [
        { label: "New Submission", link: "/author/role?page=new_submission", description: "Submit a new paper for review." },
        { label: "Check Status", link: "/author/role?page=check_status", description: "Check the status of your submitted papers." },
        { label: "Submitted Papers", link: "/author/role?page=submitted_papers", description: "View list of all papers you have submitted." },
        { label: "Under Review", link: "/author/role?page=under_review", description: "View papers currently under review." },
        { label: "Accepted Papers", link: "/author/role?page=accepted_papers", description: "View accepted papers and proceed to payment or publication." },
        { label: "Minor Reviewed", link: "/author/role?page=minor_rejected", description: "View papers requiring minor revisions." },
        { label: "Rejected Papers", link: "/author/role?page=rejected_papers", description: "View papers that have been rejected." },
        { label: "Published Papers", link: "/author/role?page=published_papers", description: "View your published papers." },
        { label: "My Certificates", link: "/author/role?page=certificates", description: "Download publication certificates." },
    ];

    // Placeholder sections to match layout style if needed, or just keep it simple basically.
    // Since Author is mostly about managing own papers, extra sections might be overkill but consistent.
    const guideItems = [
        { label: "Author Guidelines", link: "#", description: "Read guidelines before submission." }, // Placeholder link
        { label: "Submission Access", link: "#", description: "Information about submission process." }
    ];

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-teal-700 mb-8 pb-4 border-b border-gray-200">
                Home
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <DashboardSection title="Roles(Author)" items={roleItems} />
                </div>

                <div>
                    <DashboardSection title="Guidelines & Info" items={guideItems} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
