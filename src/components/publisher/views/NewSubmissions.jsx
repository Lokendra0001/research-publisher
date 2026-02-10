"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { FileText, UserPlus, CheckCircle, Search, Download } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import Skeleton from '@/components/common/Skeleton';

const NewSubmissions = () => {
    const [papers, setPapers] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignments, setAssignments] = useState({}); // { paperId: reviewerId }
    const [assigning, setAssigning] = useState({}); // { paperId: boolean }
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [papersRes, reviewersRes] = await Promise.all([
                    axios.get(`${constant.SERVER_URL}admin/papers?status=submitted`, { withCredentials: true }),
                    axios.get(`${constant.SERVER_URL}admin/users?role=reviewer&isVerified=true`, { withCredentials: true })
                ]);

                if (papersRes.data.success) {
                    setPapers(papersRes.data.data.papers);
                }
                if (reviewersRes.data.success) {
                    setReviewers(reviewersRes.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                notify.error("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (papers.length > 0 && reviewers.length > 0) {
            const newAssignments = {};
            let hasChanges = false;

            papers.forEach(paper => {
                if (paper.suggestedReviewerEmail && !assignments[paper.id]) {
                    const matchedReviewer = reviewers.find(
                        r => r.email.trim().toLowerCase() === paper.suggestedReviewerEmail.trim().toLowerCase()
                    );

                    if (matchedReviewer) {
                        newAssignments[paper.id] = matchedReviewer.id;
                        hasChanges = true;
                    }
                }
            });

            if (hasChanges) {
                setAssignments(prev => ({ ...prev, ...newAssignments }));
            }
        }
    }, [papers, reviewers, assignments]);

    const handleReviewerSelect = (paperId, reviewerId) => {
        setAssignments(prev => ({
            ...prev,
            [paperId]: reviewerId
        }));
    };

    const handleAssign = async (paperId) => {
        const reviewerId = assignments[paperId];
        if (!reviewerId) {
            notify.error("Please select a reviewer first");
            return;
        }

        try {
            setAssigning(prev => ({ ...prev, [paperId]: true }));
            const res = await axios.post(`${constant.SERVER_URL}admin/assignments`, {
                paperId,
                reviewerId
            }, { withCredentials: true });

            if (res.data.success) {
                notify.success("Reviewer assigned successfully");
                // Remove paper from list as it's no longer "new submission" (status changes to under_review)
                setPapers(prev => prev.filter(p => p.id !== paperId));
                setAssignments(prev => {
                    const newAssignments = { ...prev };
                    delete newAssignments[paperId];
                    return newAssignments;
                });
            }
        } catch (error) {
            console.error("Assignment error:", error);
            notify.error(error.response?.data?.message || "Failed to assign reviewer");
        } finally {
            setAssigning(prev => ({ ...prev, [paperId]: false }));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredPapers = papers.filter(paper =>
        paper.title.toLowerCase().includes(filter.toLowerCase()) ||
        paper.id.toLowerCase().includes(filter.toLowerCase())
    );


    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary">
                    New Submissions
                </h1>
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by Title or ID..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-border scrollbar-hidden">
                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-12">No.</th>
                            <th scope="col" className="px-6 py-3 font-bold w-24">ID</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-50 lg:min-w-auto">Paper Details</th>
                            <th scope="col" className="px-6 py-3 font-bold w-32">Date</th>
                            <th scope="col" className="px-6 py-3 font-bold w-20 text-center">Manu.</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-64 text-center">Assign Reviewer</th>
                        </tr>
                    </thead>


                    {loading ? <Skeleton /> :
                        papers.length === 0 ? (
                            <EmptyState
                                icon={CheckCircle}
                                title=" new submissions pending assignment"
                                className="bg-gray-50  border-gray-300"
                            />
                        ) : (
                            <tbody>
                                {filteredPapers.map((paper, index) => (
                                    <tr key={paper.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-primary align-top">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-text-primary/60 align-top">
                                            {paper.id.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <p className="text-text-primary font-semibold mb-1 line-clamp-2" title={paper.title}>
                                                {paper.title}
                                            </p>
                                            <p className="text-xs text-text-primary/50">
                                                Author: <span className="font-medium text-text-primary/70">{paper.author?.name || "Unknown"}</span>
                                            </p>
                                            <span className="inline-block mt-1 bg-muted text-text-primary/60 text-[10px] px-2 py-0.5 rounded border border-border">
                                                {paper.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-text-primary/50 align-top">
                                            {formatDate(paper.submittedAt)}
                                        </td>
                                        <td className="px-6 py-4 text-center align-top">
                                            {paper.manuscriptUrl ? (
                                                <a
                                                    href={paper.manuscriptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue/80 hover:bg-primary-blue/20 hover:text-primary-blue transition-colors"
                                                    title="Download Manuscript"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <span className="text-text-primary/50">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    className="w-full text-sm border-border rounded-md shadow-sm focus:border-secondary/50 focus:ring-secondary/50"
                                                    value={assignments[paper.id] || ""}
                                                    onChange={(e) => handleReviewerSelect(paper.id, e.target.value)}
                                                >
                                                    <option value="">Select Reviewer...</option>
                                                    {reviewers.map(reviewer => (
                                                        <option key={reviewer.id} value={reviewer.id}>
                                                            {reviewer.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    onClick={() => handleAssign(paper.id)}
                                                    disabled={assigning[paper.id] || !assignments[paper.id]}
                                                    className={`flex items-center justify-center gap-1 w-full px-3 py-1.5 text-xs font-medium text-primary-foreground rounded transition-colors
                                                    ${assigning[paper.id] || !assignments[paper.id]
                                                            ? "bg-text-primary/40 cursor-not-allowed"
                                                            : "bg-secondary hover:bg-secondary/90 shadow-sm"
                                                        }`}
                                                >
                                                    {assigning[paper.id] ? (
                                                        <>Assigning...</>
                                                    ) : (
                                                        <>
                                                            <UserPlus className="w-3 h-3" /> Assign
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )

                    }

                </table>
            </div>
        </div>
    );
};

export default NewSubmissions;
