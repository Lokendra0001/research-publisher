"use client";
import React from 'react';
import PublisherPaperList from '../PublisherPaperList';

const UnderReview = () => {
    return (
        <PublisherPaperList
            title="Papers Under Review"
            fetchParams={{ status: 'accepted', decision: 'null' }}
            dateHeader="Date of Issue"
            emptyStateTitle="No papers currently under review."
        />
    );
};

export default UnderReview;
