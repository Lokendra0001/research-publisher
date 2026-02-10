"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Clock, Download, FileText } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';
import Skeleton from '../common/Skeleton';

const ReviewerPaperList = ({
    title,
    filterParams = {},
    statusDateLabel = "Completed Date",
    emptyState = {
        title: "No papers found",
        description: ""
    }
}) => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                // Construct query string manually to avoid passing empty params if needed
                const params = new URLSearchParams();
                Object.entries(filterParams).forEach(([key, value]) => {
                    if (value) params.append(key, value);
                });

                const res = await axios.get(`${constant.SERVER_URL}reviews/assignments?${params.toString()}`, { withCredentials: true });
                if (res.data.success) {
                    setAssignments(res.data.data);
                }
            } catch (error) {
                console.error(`Error fetching ${title}:`, error);
                notify.error(`Failed to load ${title.toLowerCase()}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [JSON.stringify(filterParams), title]); // Use JSON.stringify to compare object content

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-GB");
    };


    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6">
                <h1 className="text-2xl font-bold text-secondary">
                    {title}
                </h1>
            </div>


            <div className="w-full overflow-x-auto border border-border ">
                <table className="w-full min-w-[800px] text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3  font-bold w-12 text-center">No.</th>
                            <th scope="col" className="px-6 py-3  font-bold w-40">Paper ID</th>
                            <th scope="col" className="px-6 py-3 text-center font-bold">Paper Title</th>
                            <th scope="col" className="px-6 py-3 text-center font-bold w-40">Date of Issue</th>
                            <th scope="col" className="px-6 py-3 text-center font-bold w-38">{statusDateLabel}</th>
                            <th scope="col" className="px-6 py-3  font-bold w-24 text-center">Paper</th>
                        </tr>
                    </thead>

                    {loading ? <Skeleton /> :

                        assignments.length === 0 ? (
                            <tbody className={``}>
                                <tr>
                                    <td colSpan="6">
                                        <div className=" text-center py-12 text-text-primary/50 bg-gray-50    w-full">
                                            <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p>No {emptyState.title.toLowerCase()} found.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {assignments.map((item, index) => (
                                    <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className=" px-6 py-4 font-medium text-gray-900 align-middle text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 align-middle max-w-[150px]">
                                            <div className="truncate font-mono text-xs" title={item.paper?.id}>
                                                {item.paper?.id || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <p className="text-gray-900 font-medium line-clamp-1" title={item.paper?.title}>
                                                {item.paper?.title}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 align-middle text-center">
                                            {formatDate(item.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 align-middle text-center">
                                            {formatDate(item.completedAt)}
                                        </td>
                                        <td className="px-6 py-4 text-center align-middle">
                                            {item.paper?.manuscriptUrl ? (
                                                <a
                                                    href={item.paper.manuscriptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-8 h-8 text-text-primary-blue/50 hover:text-primary-blue transition-colors bg-primary-blue/10 hover:bg-primary-blue/20 rounded-full"
                                                    title="Download Manuscript"
                                                >
                                                    <Download className="w-4 h-4 " />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
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

export default ReviewerPaperList;
