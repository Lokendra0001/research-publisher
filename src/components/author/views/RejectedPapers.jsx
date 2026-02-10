"use client";
import React from 'react';
import PaperList from './PaperList';

const RejectedPapers = () => {
    return <PaperList title="Rejected Papers" statusFilter="rejected" />;
};

export default RejectedPapers;
