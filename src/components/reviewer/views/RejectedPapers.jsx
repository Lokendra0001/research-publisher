"use client";
import React from 'react';
import ReviewerPaperList from '../ReviewerPaperList';

const RejectedPapers = () => {
    return (
        <ReviewerPaperList
            title="Rejected Papers"
            filterParams={{ decision: 'rejected' }}
            statusDateLabel="Rejected Date"
            emptyState={{
                title: "No rejected papers found.",
                description: ""
            }}
        />
    );
};

export default RejectedPapers;
