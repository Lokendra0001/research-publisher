"use client"
import AuthorGuidelines from '@/components/guest/guidelines/AuthorGuidelines';
import ResearchArea from '@/components/guest/guidelines/ResearchArea';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react'

import CorrectionPolicy from '@/components/guest/guidelines/CorrectionPolicy';
import PlagiarismPolicy from '@/components/guest/guidelines/PlagiarismPolicy';
import PublicationCharges from '@/components/guest/guidelines/PublicationCharges';

const Page = () => {
    const params = useParams();
    const guideline = params.guideline;

    const guidelines = {
        "author": <AuthorGuidelines />,
        "research-area": <ResearchArea />,
        "correction-policy": <CorrectionPolicy />,
        "plagiarism-policy": <PlagiarismPolicy />,
        "publication-charges": <PublicationCharges />,
    }

    return guidelines[guideline];
}

export default Page