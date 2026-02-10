"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthorSidebar from '@/components/author/AuthorSidebar';

// View Components
import NewSubmission from '@/components/author/views/NewSubmission';
import CheckStatus from '@/components/author/views/CheckStatus';
import SubmittedPapers from '@/components/author/views/SubmittedPapers';
import UnderReview from '@/components/author/views/UnderReview';
import AcceptedPapers from '@/components/author/views/AcceptedPapers';
import MinorRejected from '@/components/author/views/MinorRejected';
import RejectedPapers from '@/components/author/views/RejectedPapers';
import PublishedPapers from '@/components/author/views/PublishedPapers';
import Certificates from '@/components/author/views/Certificates';
import MyCertificate from '../views/MyCertificate';

const RoleContent = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 'new_submission';

    const renderContent = () => {
        switch (page) {
            case 'new_submission': return <NewSubmission />;
            case 'check_status': return <CheckStatus />;
            case 'submitted_papers': return <SubmittedPapers />;
            case 'under_review': return <UnderReview />;
            case 'accepted_papers': return <AcceptedPapers />;
            case 'minor_rejected': return <MinorRejected />;
            case 'rejected_papers': return <RejectedPapers />;
            case 'published_papers': return <PublishedPapers />;
            case 'certificates': return <MyCertificate />;
            default: return <NewSubmission />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white min-h-[calc(100vh-64px)]">
            <AuthorSidebar />
            <main className="flex-1 mt-5 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default RoleContent;