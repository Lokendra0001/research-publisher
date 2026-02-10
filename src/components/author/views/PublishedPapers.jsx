"use client";
import React from 'react';
import PaperList from './PaperList';

const PublishedPapers = () => {
    return <PaperList title="Published Papers" statusFilter="published" />;
};

export default PublishedPapers;
