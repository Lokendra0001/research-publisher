"use client";
import React from 'react';
import ReviewerPaperList from '../ReviewerPaperList';

const MinorRejectedPapers = () => {
    return (
        <ReviewerPaperList
            title="Minor Rejected Papers"
            filterParams={{ decision: 'minor_reject' }}
            statusDateLabel="Rejected Date"
            emptyState={{
                title: "minor rejected papers ",
                description: ""
            }}
        />
    );
};

export default MinorRejectedPapers;
