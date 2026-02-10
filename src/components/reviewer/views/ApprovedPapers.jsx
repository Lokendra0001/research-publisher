"use client";
import React from 'react';
import ReviewerPaperList from '../ReviewerPaperList';

const ApprovedPapers = () => {
    return (
        <ReviewerPaperList
            title="Approved Papers"
            filterParams={{ decision: 'accepted' }}
            statusDateLabel="Approved Date"
            emptyState={{
                title: "No approved papers found.",
                description: ""
            }}
        />
    );
};

export default ApprovedPapers;
