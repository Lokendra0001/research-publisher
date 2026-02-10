import { useSearchParams } from 'next/navigation';
import ReviewerSidebar from '@/components/reviewer/ReviewerSidebar';
import ReviewInvitations from '@/components/reviewer/views/ReviewInvitations';
import ReceivedPapers from '@/components/reviewer/views/ReceivedPapers';
import ApprovedPapers from '@/components/reviewer/views/ApprovedPapers';
import MinorRejectedPapers from '@/components/reviewer/views/MinorRejectedPapers';
import RejectedPapers from '@/components/reviewer/views/RejectedPapers';
import DeadlineExpiredPapers from '@/components/reviewer/views/DeadlineExpiredPapers';

const RoleContent = () => {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 'invitation_for_reviewing';

    const renderContent = () => {
        switch (page) {
            case 'invitation_for_reviewing': return <ReviewInvitations />;
            case 'received_papers': return <ReceivedPapers />;
            case 'approved_papers': return <ApprovedPapers />;
            case 'minor_rejected_papers': return <MinorRejectedPapers />;
            case 'rejected_papers': return <RejectedPapers />;
            case 'deadline_expired_papers': return <DeadlineExpiredPapers />;
            default: return <ReviewInvitations />;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 md:gap-0 bg-white min-h-[calc(100vh-64px)]">
            <ReviewerSidebar />
            <main className="flex-1  md:p-8 min-w-0 overflow-x-hidden">
                {renderContent()}
            </main>
        </div>
    );
};

export default RoleContent;