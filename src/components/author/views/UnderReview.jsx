"use client";
import React from 'react';
import PaperList from './PaperList';

const UnderReview = () => {
    return <PaperList title="Under Review Papers" statusFilter="under_review" />;
};

export default UnderReview;
