"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Search, FileText, Download, Clock } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/common/EmptyState';
import Skeleton from '@/components/common/Skeleton';

const PublisherPaperList = ({
    title,
    fetchParams = {},
    dateHeader = "Date",
    dateField = "createdAt",
    emptyStateTitle,
    emptyStateIcon: Icon = Clock
}) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${constant.SERVER_URL}admin/assignments`, {
                    params: fetchParams,
                    withCredentials: true
                });

                if (res.data.success) {
                    setAssignments(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching assignments:", error);
                notify.error(`Failed to load ${title.toLowerCase()}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [JSON.stringify(fetchParams)]); // Re-fetch if params change

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB");
    };

    const filteredAssignments = assignments.filter(item =>
        item.paper?.title?.toLowerCase().includes(filter.toLowerCase()) ||
        item.reviewer?.name?.toLowerCase().includes(filter.toLowerCase()) ||
        (item.paper?.customId && item.paper?.customId.toLowerCase().includes(filter.toLowerCase())) ||
        (item.paper?.id && item.paper.id.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary">
                    {title}
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
                <table className="w-full text-sm text-left text-text-primary/50 ">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-14">No.</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 lg:min-w-auto">Paper Title</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 lg:min-w-auto">Reviewer Name</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-[152px]">{dateHeader}</th>
                            <th scope="col" className="px-6 py-3 font-bold w-20 text-center">Paper</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-[152px] text-center">More Details</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-border rounded w-8"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-border rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-border rounded w-1/2"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-border rounded w-32 mb-2"></div>
                                        <div className="h-3 bg-border rounded w-24"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-border rounded w-24"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-8 w-8 bg-border rounded-full mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-8 bg-border rounded w-full"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : assignments.length === 0 ? (
                        <EmptyState
                            icon={Icon}
                            title={emptyStateTitle}
                            className="bg-gray-50 rounded-lg border border-dashed border-gray-300"
                        />
                    ) : (
                        <tbody>
                            {filteredAssignments.map((item, index) => (
                                <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary align-middle">
                                        {index + 1}
                                    </td>

                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-text-primary font-medium line-clamp-1" title={item.paper?.title}>
                                            {item.paper?.title || "Unknown Paper"}
                                        </p>
                                        <p className="text-xs text-mono text-text-primary/50 mt-1">
                                            ID: {item.paper?.customId || item.paper?.id?.slice(0, 8) || "N/A"}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-text-primary font-medium">{item.reviewer?.name || "Unknown"}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-primary align-middle">
                                        {formatDate(item[dateField])}
                                    </td>
                                    <td className="px-6 py-4 text-center align-middle">
                                        {item.paper?.manuscriptUrl ? (
                                            <a
                                                href={item.paper.manuscriptUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue/80 hover:bg-primary-blue/20 hover:text-primary-blue transition-colors border border-primary-blue/20"
                                                title="Download Manuscript"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-text-primary/50">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center align-middle">
                                        <Link
                                            href={`/view_more_action?id=${item.paper?.id}`}
                                            className="inline-block text-secondary/90 hover:text-secondary font-medium text-xs border border-secondary/60 px-3 py-1 rounded hover:bg-secondary/10 transition-colors"
                                        >
                                            View more
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default PublisherPaperList;
