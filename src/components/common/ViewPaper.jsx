import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { X, Loader2 } from 'lucide-react';
import DetailTable from './DetailTable';

const ViewPaperModal = ({ paperId, isOpen, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [paperData, setPaperData] = useState(null);

    useEffect(() => {
        if (isOpen && paperId) {
            fetchPaperDetails();
        }
    }, [isOpen, paperId]);

    const fetchPaperDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}admin/papers/${paperId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setPaperData(res.data.data);
            } else {
                notify.error(res.data.message || "Failed to fetch paper details");
                onClose();
            }
        } catch (error) {
            console.error("Error fetching paper details:", error);
            // Fallback to public endpoint if admin fails (e.g. for reviewers)
            try {
                const publicRes = await axios.get(`${constant.SERVER_URL}public/papers/${paperId}`);
                if (publicRes.data.success) {
                    setPaperData(publicRes.data.data);
                } else {
                    notify.error("Failed to load details");
                    onClose();
                }
            } catch (err) {
                notify.error("Failed to load details");
                onClose();
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const prepareSections = (data) => {
        if (!data) return [];

        // Check for review-specific reason (e.g., if viewing as reviewer or admin looking at assignment)
        // Accessing conflictReason from the paper object directly if context injection puts it there, 
        // OR checking the first review assignment if available.
        const conflictReason = data.conflictReason || (Array.isArray(data.reviews) && data.reviews.length > 0 ? data.reviews[0].conflictReason : null);

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
                    { label: "Status", value: data.status?.toUpperCase().replace(/_/g, " ") },
                    { label: "Current Version", value: `v${data.currentVersion}` },
                    { label: "Submission Date", value: data.submittedAt ? new Date(data.submittedAt).toLocaleDateString() : "Pending" },
                ]
            },
            {
                header: "Author Details",
                items: [
                    { label: "Author Name", value: data.author?.name },
                    { label: "Author Email", value: data.author?.email },
                    { label: "Mobile", value: data.author?.mobile || "N/A" },
                    { label: "Institution", value: data.author?.institution },
                    { label: "Department", value: data.author?.department },
                    { label: "Designation", value: data.author?.designation },
                    { label: "Country", value: data.author?.country },
                    { label: "Address", value: data.author?.address },
                    { label: "Co-Authors", value: data.coAuthors ? (Array.isArray(data.coAuthors) ? data.coAuthors.map(c => c.name).join(", ") : "None") : "None" }
                ]
            },
            {
                header: "Manuscript Details",
                items: [
                    { label: "File Name", value: data.manuscriptName || "N/A" },
                    { label: "File Size", value: data.manuscriptSize ? `${(data.manuscriptSize / 1024).toFixed(2)} KB` : "N/A" },
                    { label: "Abstract", value: data.abstract },
                    { label: "Keywords", value: Array.isArray(data.keywords) ? data.keywords.join(", ") : data.keywords },
                ]
            }
        ];

        // Add Publication Info if published
        if (data.status === 'published' || data.publishedAt) {
            sections.push({
                header: "Publication Details",
                items: [
                    { label: "Volume", value: data.volume?.volumeNumber ? `Vol ${data.volume.volumeNumber}` : "N/A" },
                    { label: "Issue", value: data.issue?.issueNumber ? `Issue ${data.issue.issueNumber}` : "N/A" },
                    { label: "Publication Date", value: data.publishedAt ? new Date(data.publishedAt).toLocaleDateString() : "N/A" },
                    { label: "Page Numbers", value: data.pageStart ? `${data.pageStart} - ${data.pageEnd}` : "N/A" }
                ]
            });
        }

        // Add Conflict Reason if present
        if (conflictReason) {
            sections.push({
                header: "Review Conflict Information",
                items: [
                    { label: "Conflict Reason", value: conflictReason }
                ]
            });
        }

        return sections;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto p-4">
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 rounded-full p-1"
                >
                    <X size={24} />
                </button>

                <div className="p-6 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
                        </div>
                    ) : (
                        <DetailTable
                            title="PAPER DETAILS"
                            sections={prepareSections(paperData)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewPaperModal;
