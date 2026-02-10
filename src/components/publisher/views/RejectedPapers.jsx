"use client";
import React from 'react';
import PublisherPaperList from '../PublisherPaperList';

const RejectedPapers = () => {
    return (
        <PublisherPaperList
            title="Rejected Papers"
            fetchParams={{ status: 'accepted', decision: 'rejected' }}
            dateHeader="Completed On"
            dateField="completedAt"
            emptyStateTitle="papers with rejection status"
        />
    );
};

export default RejectedPapers;
