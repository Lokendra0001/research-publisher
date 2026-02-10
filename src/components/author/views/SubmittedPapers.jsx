"use client";
import React from 'react';
import PaperList from './PaperList';

const SubmittedPapers = () => {
    // submitted status generally means just "submitted" or "all submitted"? 
    // The previous implementation fetched ALL. 
    // But now we have specific pages for other statuses.
    // Let's assume "Submitted Papers" means only papers currently in 'submitted' status.
    return <PaperList title="Submitted Papers" statusFilter="submitted" />;
};

export default SubmittedPapers;
