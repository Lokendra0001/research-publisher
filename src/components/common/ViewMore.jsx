"use client";
import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import DetailTable from '@/components/common/DetailTable';
import { useSearchParams, useRouter } from 'next/navigation';

const ViewMoreActionContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paperId = searchParams.get('id');

    const [loading, setLoading] = useState(true);
    const [paperData, setPaperData] = useState(null);

    useEffect(() => {
        if (paperId) {
            fetchPaperDetails();
        }
    }, [paperId]);

    const fetchPaperDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}papers/${paperId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setPaperData(res.data.data);
            } else {
                notify.error(res.data.message || "Failed to fetch paper details");
            }
        } catch (error) {
            console.error("Error fetching paper details:", error);
            notify.error("Failed to load details");
        } finally {
            setLoading(false);
        }
    };

    if (!paperId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="p-8 bg-white rounded-lg shadow-md text-center">
                    <p className="text-red-500 font-medium text-lg mb-4">No Paper ID provided.</p>
                    <button
                        onClick={() => router.back()}
                        className="text-teal-600 hover:text-teal-800 underline"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const prepareSections = (data) => {
        if (!data) return [];

        const sections = [
            {
                header: "Paper Information",
                items: [
                    { label: "Paper ID", value: data.customId || data.id },
                    { label: "Paper Title", value: data.title },
                    { label: "Category", value: data.category },
                    { label: "Sub Category", value: data.subCategory },
                    { label: "Research Type", value: data.researchType },
                    { label: "DOI", value: data.doi || "N/A" },
                ]
            },
            {
                header: "Author Details",
                items: [
                    { label: "Author Name", value: data.author?.name },
                    { label: "Author Email", value: data.author?.email },
                    { label: "Author Institution", value: data.author?.institution },
                    { label: "Author Department", value: data.author?.department },
                    { label: "Co-Authors", value: data.coAuthors ? (Array.isArray(data.coAuthors) ? data.coAuthors.map(c => c.name).join(", ") : data.coAuthors) : "None" }
                ]
            },
            {
                header: "Additional Information",
                items: [
                    { label: "Keywords", value: Array.isArray(data.keywords) ? data.keywords.join(", ") : data.keywords },
                    { label: "Abstract", value: data.abstract },
                    { label: "Page Numbers", value: data.pageStart ? `${data.pageStart} - ${data.pageEnd}` : "N/A" },
                    { label: "Submission Date", value: new Date(data.createdAt || data.submittedAt).toLocaleDateString() },
                    { label: "Status", value: data.status?.toUpperCase() }
                ]
            }
        ];

        return sections;
    };

    return (
        <div className="min-h-screen  p-8">
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-sm rounded-xl border border-gray-200">
                <div className="mb-8 flex items-center justify-center border-b border-gray-100 pb-4">

                    <h1 className="text-2xl font-bold text-teal-700">
                        Paper Details
                    </h1>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96">
                        <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
                    </div>
                ) : (
                    <div className="animate-in fade-in duration-500">
                        <DetailTable
                            title="PAPER INFORMATION"
                            sections={prepareSections(paperData)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const ViewMore = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ViewMoreActionContent />
        </Suspense>
    );
};

export default ViewMore;
