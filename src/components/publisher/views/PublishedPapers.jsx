"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Clock, Search, FileText } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/common/EmptyState';


const PublishedPapers = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${constant.SERVER_URL}admin/papers?status=published`, { withCredentials: true });

                if (res.data.success) {
                    setPapers(res.data.data.papers);
                }
            } catch (error) {
                console.error("Error fetching published papers:", error);
                notify.error("Failed to load published papers");
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-GB");
    };

    const filteredPapers = papers.filter(item =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.author?.name.toLowerCase().includes(filter.toLowerCase()) ||
        (item.customId && item.customId.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary">
                    Published Papers
                </h1>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Paper or Author..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        disabled={loading}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-border scrollbar-hidden">
                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-4 py-3 font-bold w-10">No.</th>
                            <th scope="col" className="px-4 py-3 font-bold w-28 ">Paper ID</th>
                            <th scope="col" className="px-4 py-3 font-bold min-w-40">Paper Title</th>
                            <th scope="col" className="px-4 py-3 font-bold min-w-36">Author</th>
                            <th scope="col" className="px-4 py-3 font-bold min-w-32 whitespace-nowrap">Vol/Issue</th>
                            <th scope="col" className="px-4 py-3 font-bold min-w-28 whitespace-nowrap">Published</th>
                            <th scope="col" className="px-4 py-3 font-bold min-w-16 text-center">File</th>
                            <th scope="col" className="px-4 py-3 font-bold min-w-28 text-center whitespace-nowrap">Details</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-4 py-4 w-10">
                                        <div className="h-4 bg-border rounded w-8"></div>
                                    </td>
                                    <td className="px-4 py-4 w-28 whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-24"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-border rounded w-3/4"></div>
                                    </td>
                                    <td className="px-4 py-4 w-36">
                                        <div className="h-4 bg-border rounded w-32 mb-1"></div>
                                        <div className="h-3 bg-border rounded w-24"></div>
                                    </td>
                                    <td className="px-4 py-4 w-32 whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-28"></div>
                                    </td>
                                    <td className="px-4 py-4 w-28 whitespace-nowrap">
                                        <div className="h-4 bg-border rounded w-20"></div>
                                    </td>
                                    <td className="px-4 py-4 w-16 text-center">
                                        <div className="h-8 w-8 bg-border rounded-full mx-auto"></div>
                                    </td>
                                    <td className="px-4 py-4 w-28 text-center whitespace-nowrap">
                                        <div className="h-6 bg-border rounded w-20 mx-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : papers.length === 0 ? (
                        <EmptyState
                            icon={Clock}
                            title="published papers"
                            colSpan="8"
                        />
                    ) : (
                        <tbody>
                            {filteredPapers.map((item, index) => (
                                <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 w-10 font-medium text-text-primary align-middle">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-4 font-medium text-text-primary ">
                                        <p className="line-clamp-1">
                                            {item.id || "N/A"}
                                        </p>
                                    </td>

                                    <td className="px-4 py-4 align-middle">
                                        <p className="text-text-primary font-medium line-clamp-1 overflow-hidden" title={item.title}>
                                            {item.title}
                                        </p>
                                    </td>
                                    <td className="px-4 py-4 w-36 align-middle">
                                        <p className="text-text-primary font-medium">{item.author?.name || "Unknown"}</p>
                                        <p className="text-xs text-text-primary/50">{item.author?.institution || ""}</p>
                                    </td>
                                    <td className="px-4 py-4 w-32 align-middle whitespace-nowrap">
                                        {item.volume ? (
                                            <div className="text-xs">
                                                <p className="font-semibold text-text-primary">Vol {item.volume.volumeNumber} ({item.volume.year})</p>
                                                {item.issue && <p className="text-text-primary/50">Issue {item.issue.issueNumber}</p>}
                                            </div>
                                        ) : (
                                            <span className="text-text-primary/50">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 w-28 whitespace-nowrap text-text-primary align-middle">
                                        {formatDate(item.publishedAt || item.updatedAt)}
                                    </td>
                                    <td className="px-4 py-4 w-16 text-center align-middle">
                                        {item.manuscriptUrl ? (
                                            <a
                                                href={item.manuscriptUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue/80 hover:bg-primary-blue/20 hover:text-primary-blue transition-colors border border-primary-blue/20"
                                                title="Download Published Version"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-text-primary/50">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 w-28 text-center align-middle">
                                        <Link
                                            href={`/view_more_action?id=${item.id}`}
                                            target='_blank'
                                            className="text-secondary/90 hover:text-secondary font-medium text-xs border border-secondary/60 px-3 py-1 rounded hover:bg-secondary/10 transition-colors whitespace-nowrap">
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

export default PublishedPapers;
