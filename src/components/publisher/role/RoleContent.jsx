import React from 'react'
import { useSearchParams } from 'next/navigation';
import PublisherSidebar from '@/components/publisher/PublisherSidebar';
import NewSubmissions from '@/components/publisher/views/NewSubmissions';
import RejectedInvitations from '@/components/publisher/views/RejectedInvitations';
import UnderReview from '@/components/publisher/views/UnderReview';
import MinorReject from '@/components/publisher/views/MinorReject';
import RejectedPapers from '@/components/publisher/views/RejectedPapers';
import AcceptedPapers from '@/components/publisher/views/AcceptedPapers';
import PublishedPapers from '@/components/publisher/views/PublishedPapers';
import ApproveReviewers from '@/components/publisher/views/ApproveReviewers';
import HomeContent from '../views/HomeContent';
import IssueCertificate from '../views/IssueCertificate';
import ListissueCertificate from '../views/ListIssueCertificate';
import Refundable from '../views/Refundable';


const RoleContent = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 'approve_reviewers';

    const renderContent = () => {
        switch (page) {
            case 'home_content': return <HomeContent title="Home Page Content" />;
            case 'approve_reviewers': return <ApproveReviewers />;
            case 'new_submissions': return <NewSubmissions />;
            case 'rejected_invitations': return <RejectedInvitations />;
            case 'under_review': return <UnderReview />;
            case 'minor_reject': return <MinorReject />;
            case 'accepted_papers': return <AcceptedPapers />;
            case 'rejected_papers': return <RejectedPapers />;
            case 'published_papers': return <PublishedPapers />;
            case 'issue_certificate': return <IssueCertificate />;
            case 'issued_certificate_list': return <ListissueCertificate title="Issued Certificate List" />;
            case 'refundable': return <Refundable />;
            default: return <ApproveReviewers />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row bg-white min-h-[calc(100vh-64px)]">
            <PublisherSidebar />
            <main className="flex-1 mt-5 md:p-8 min-w-0 overflow-x-hidden">
                {renderContent()}
            </main>
        </div>
    );
};
export default RoleContent