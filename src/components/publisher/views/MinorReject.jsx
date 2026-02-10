"use client";
import React from 'react';
import PublisherPaperList from '../PublisherPaperList';

const MinorReject = () => {
    return (
        <PublisherPaperList
            title="Minor Rejections"
            fetchParams={{ status: 'accepted', decision: 'minor_reject' }}
            dateHeader="Date of Issue"
            emptyStateTitle="No papers with minor rejection status."
        />
    );
};

export default MinorReject;
