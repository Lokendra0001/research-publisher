"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Clock, Download } from 'lucide-react';
import ReviewerPaperList from '../ReviewerPaperList';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';

const DeadlineExpiredPapers = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${constant.SERVER_URL}reviews/assignments?status=removed`, { withCredentials: true });
                if (res.data.success) {
                    setAssignments(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching expired papers:", error);
                notify.error("Failed to load expired papers");
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-GB");
    };


    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6">
                <h1 className="text-2xl font-bold text-secondary">
                    Deadline Expired Papers
                </h1>
            </div>



            < div className="w-full overflow-x-auto border border-border ">
                <table className="w-full min-w-[800px] text-sm text-left text-text-primary/60">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border/70">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-12">No.</th>
                            <th scope="col" className="px-6 py-3 font-bold w-32">Paper ID</th>
                            <th scope="col" className="px-6 py-3 text-center font-bold">Paper Title</th>
                            <th scope="col" className="px-6 py-3 font-bold w-38">Date of Issue</th>
                            <th scope="col" className="px-6 py-3 font-bold w-32">Deadline</th>
                            <th scope="col" className="px-6 py-3 font-bold w-20 text-center">Paper</th>
                        </tr>
                    </thead>
                    {loading ? <Skeleton /> :

                        assignments.length === 0 ? (
                            <EmptyState title='expired papers found.' />
                        ) : (

                            <tbody>
                                {assignments.map((item, index) => (
                                    <tr key={item.id} className="bg-primary-foreground border-b border-border  hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-primary align-middle text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-text-primary align-middle line-clamp-1">
                                            {item.paper?.id || "N/A"}
                                        </td>
                                        <td className="px-6 py-4 align-middle">
                                            <p className="text-text-primary font-medium line-clamp-2" title={item.paper?.title}>
                                                {item.paper?.title}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-text-primary align-middle">
                                            {formatDate(item.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-danger font-medium align-middle">
                                            {formatDate(item.deadline)}
                                        </td>
                                        <td className="px-6 py-4 text-center align-middle">
                                            {item.paper?.manuscriptUrl ? (
                                                <a
                                                    href={item.paper.manuscriptUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-8 h-8 text-primary-blue/80 hover:text-primary-blue transition-colors"
                                                    title="Download Manuscript"
                                                >
                                                    <Download className="w-5 h-5" />
                                                </a>
                                            ) : (
                                                <span className="text-text-primary/50">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>)
                    }


                </table>
            </div>

        </div >
    );
};

export default DeadlineExpiredPapers;
