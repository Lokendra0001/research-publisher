"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constant } from "@/utils/constant";
import { Download, Eye, FileText, Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notify } from "@/utils/toast";
import Skeleton from "@/components/common/Skeleton";

const PaperList = ({ title, statusFilter, actionRenderer, isCheckStatus = false }) => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetchPapers = async () => {
            try {

                const endpoint = statusFilter
                    ? `${constant.SERVER_URL}papers?status=${statusFilter}`
                    : `${constant.SERVER_URL}papers`;

                const res = await axios.get(endpoint, {
                    withCredentials: true,
                });

                if (res.data.success) {

                    setPapers(res.data.data.papers);
                }
            } catch (err) {
                console.error(err);
                notify.error(`Failed to fetch ${title.toLowerCase()}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, [statusFilter, title]);

    const filteredPapers = papers.filter(paper =>
        paper.title.toLowerCase().includes(filter.toLowerCase()) ||
        paper.id.toLowerCase().includes(filter.toLowerCase())
    );

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            submitted: {
                color: "bg-blue-100 text-blue-800 border-blue-200",
                icon: <Clock className="w-3 h-3 mr-1" />,
                label: "Submitted"
            },
            under_review: {
                color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                icon: <Eye className="w-3 h-3 mr-1" />,
                label: "Under Review"
            },
            accepted: {
                color: "bg-green-100 text-green-800 border-green-200",
                icon: <CheckCircle className="w-3 h-3 mr-1" />,
                label: "Accepted"
            },
            rejected: {
                color: "bg-red-100 text-red-800 border-red-200",
                icon: <XCircle className="w-3 h-3 mr-1" />,
                label: "Rejected"
            },
            published: {
                color: "bg-purple-100 text-purple-800 border-purple-200",
                icon: <FileText className="w-3 h-3 mr-1" />,
                label: "Published"
            },
            minor_reject: {
                color: "bg-orange-100 text-orange-800 border-orange-200",
                icon: <AlertCircle className="w-3 h-3 mr-1" />,
                label: "Minor Revision"
            }
        };

        const config = statusConfig[status] || {
            color: "bg-gray-100 text-gray-800 border-border",
            icon: <FileText className="w-3 h-3 mr-1" />,
            label: status?.replace(/_/g, " ") || "Unknown"
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
                {config.label}
            </span>
        );
    };


    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border">
            <div className="border-b border-border pb-4 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl  font-bold text-primary-blue border-l-4 border-warning pl-3">
                    {title}
                </h1>

                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by Title or ID..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none "
                    />
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="w-full  text-sm text-left text-border border border-border rounded-lg">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-16"> No.</th>
                            <th scope="col" className="px-6 py-3 font-bold w-32">Paper ID</th>
                            <th scope="col" className="px-6 py-3 font-bold">Title</th>
                            <th scope="col" className="px-6 py-3 font-bold w-40">{isCheckStatus ? "Status" : "Submitted On"}</th>
                            <th scope="col" className="px-6 py-3 font-bold w-24 text-center">Download</th>
                            <th scope="col" className="px-6 py-3 font-bold w-24 text-center">Action</th>
                        </tr>
                    </thead>

                    {loading ?
                        <Skeleton /> :
                        filteredPapers.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan="6">
                                        <div className="text-center py-12 text-text-primary/40 bg-gray-50 border-border w-full">
                                            <FileText className="w-12 h-12 mx-auto mb-3 " />
                                            <p>No {title.toLowerCase()} found.</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {filteredPapers.map((paper, index) => (
                                    <tr key={paper.id} className="bg-primary-foreground border-b border-border hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-primary/90">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-text-primary/60">
                                            {paper.id.slice(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 text-text-primary/80 font-medium">
                                            {paper.title}
                                        </td>
                                        <td className="px-6 py-4 text-text-primary/80 space-nowrap text-center">
                                            {isCheckStatus ? getStatusBadge(paper?.status) : formatDate(paper.submittedAt)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {paper.manuscriptUrl ? (
                                                <a
                                                    href={paper.manuscriptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-text-primary/60 hover:text-primary-blue hover:bg-blue-100 transition-colors"
                                                    title="Download Manuscript"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <span className="text-text-primar/40">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {/* Default action or custom action */}
                                            {actionRenderer ? actionRenderer(paper) : (
                                                <Link
                                                    href={`/view_more_action?id=${paper.id}`}
                                                    target='_blank'
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/10 text-success hover:bg-success/20 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
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

export default PaperList;
