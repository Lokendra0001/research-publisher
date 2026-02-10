"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Clock, Search, FileText, Upload, Send, DownloadIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/common/EmptyState';
import Skeleton from '@/components/common/Skeleton';

const AcceptedPapers = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState({});
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                // Fetch assignments where decision is 'accept'
                const res = await axios.get(`${constant.SERVER_URL}admin/assignments?status=accepted&decision=accepted`, { withCredentials: true });

                if (res.data.success) {
                    setAssignments(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching assignments:", error);
                notify.error("Failed to load accepted papers");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const filteredAssignments = assignments.filter(item =>
        item.paper?.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.reviewer?.name.toLowerCase().includes(filter.toLowerCase()) ||
        (item.paper?.customId && item.paper?.customId.toLowerCase().includes(filter.toLowerCase()))
    );


    const handlePublish = async (reviewId, paperId) => {
        // Placeholder for publish functionality
        try {
            setPublishing(prev => ({
                ...prev,
                [reviewId]: true
            }));

            // Fetch assignments where decision is 'accept'
            const res = await axios.patch(`${constant.SERVER_URL}papers/${paperId}`, { reviewId, status: 'published', pubAt: true }, { withCredentials: true });


            if (res.data.success) {
                notify.success(res.data.message)
                setAssignments(assignments.filter((assignment) => assignment.id !== reviewId))
            }

        } catch (error) {
            notify.error(error?.response?.data?.message || error?.message || "Failed to Publish!");
        } finally {
            setPublishing(prev => ({
                ...prev,
                [reviewId]: false
            }));

        }
    };


    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary">
                    Accepted Papers
                </h1>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Paper or Reviewer..."
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
                            <th scope="col" className="px-6 py-3 font-bold min-w-[200px]">Paper Title</th>
                            <th scope="col" className="px-6 py-3 font-bold w-50 whitespace-nowrap">Reviewed By</th>
                            <th scope="col" className="px-6 py-3 font-bold w-16 text-center">Paper</th>
                            <th scope="col" className="px-6 py-3 font-bold w-16 text-center">View More</th>
                            <th scope="col" className="px-6 py-3 font-bold w-28 text-center">Publish</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-6 py-4 w-12">
                                        <div className="h-4 bg-border rounded w-8"></div>
                                    </td>
                                    <td className="px-6 py-4 min-w-[200px]">
                                        <div className="h-4 bg-border rounded w-48 mb-2"></div>
                                    </td>
                                    <td className="px-6 py-4 w-40 whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-32"></div>
                                    </td>
                                    <td className="px-6 py-4 w-40 whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-28"></div>
                                    </td>
                                    <td className="px-6 py-4 w-16 text-center">
                                        <div className="h-8 w-8 bg-border rounded-full mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-32 text-center">
                                        <div className="h-6 bg-border rounded w-20 mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-40 whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-28"></div>
                                    </td>
                                    <td className="px-6 py-4 w-32 text-center whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-16 mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-40 text-center whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-28 mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-28 text-center">
                                        <div className="h-6 bg-border rounded w-20 mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-28 text-center">
                                        <div className="h-6 bg-border rounded w-20 mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-28 text-center">
                                        <div className="h-6 bg-border rounded w-20 mx-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) :

                        assignments.length === 0 ? (
                            <EmptyState title='accepted papers' />

                        ) : (
                            <tbody>
                                {filteredAssignments.map((item, index) => (
                                    <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 w-12 font-medium text-text-primary align-middle">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 min-w-[200px] font-medium text-text-primary align-middle text-sm">
                                            {item.paper?.title || "N/A"}
                                        </td>

                                        <td className="px-6 py-4 w-40 align-middle text-sm whitespace-nowrap text-text-primary font-medium">
                                            {item.reviewer?.name || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 w-16 text-center align-middle">
                                            {item.paper?.manuscriptUrl ? (
                                                <a
                                                    href={item.paper.manuscriptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue/80 hover:bg-primary-blue/20 hover:text-primary-blue transition-colors border border-primary-blue/20"
                                                    title="Download PDF"
                                                >
                                                    <DownloadIcon className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <span className="text-text-primary/50">-</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 w-28 text-center align-middle">
                                            <Link
                                                href={`/view_more_action?id=${item.paper.id}`}
                                                target='_blank'
                                                className="text-secondary/90 hover:text-secondary font-medium text-xs border border-secondary/60 px-3 py-1 rounded hover:bg-secondary/10 transition-colors whitespace-nowrap">
                                                View more
                                            </Link>
                                        </td>

                                        <td className="px-6 py-4 w-28 text-center align-middle">
                                            <button
                                                onClick={() => handlePublish(item.id, item.paper?.id)}
                                                disabled={!!publishing[item.id]}
                                                className="text-primary-foreground bg-secondary hover:bg-secondary/90 font-medium text-xs px-3 py-1 rounded shadow-sm transition-colors flex items-center justify-center gap-1 mx-auto whitespace-nowrap disabled:bg-secondary/50 disabled:cursor-not-allowed"
                                            >
                                                {publishing[item.id] ? (
                                                    <>
                                                        <Loader2 size={16} className="animate-spin" />
                                                        Publishing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-3 h-3" />
                                                        Publish
                                                    </>
                                                )}
                                            </button>

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

export default AcceptedPapers;
