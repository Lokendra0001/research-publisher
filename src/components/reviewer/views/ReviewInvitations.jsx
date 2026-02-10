"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Clock, Download, Check, X } from 'lucide-react';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';

const ReviewInvitations = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [responseType, setResponseType] = useState(null);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}reviews/assignments?status=pending`, { withCredentials: true });
            if (res.data.success) {
                setAssignments(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching review invitations:", error);
            notify.error("Failed to load review invitations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const handleResponse = async (id, accept) => {
        try {
            setProcessingId(id);
            setResponseType(accept ? 'accept' : 'decline');

            let conflictReason = null;
            if (!accept) {
                const reason = prompt("Please provide a reason for declining (optional):");
                if (reason === null) {
                    setProcessingId(null);
                    setResponseType(null);
                    return; // User cancelled
                }
                conflictReason = reason;
            }

            const res = await axios.post(`${constant.SERVER_URL}reviews/${id}/respond`, {
                accept,
                conflictReason
            }, { withCredentials: true });

            if (res.data.success) {
                notify.success(`Invitation ${accept ? 'accepted' : 'declined'} successfully`);
                fetchAssignments();
            }
        } catch (error) {
            console.error("Error responding to invitation:", error);
            notify.error(error.response?.data?.message || "Failed to respond");
        } finally {
            setProcessingId(null);
            setResponseType(null);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-GB");
    };



    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6">
                <h1 className="text-2xl font-bold text-secondary">
                    Invitation for Reviewing
                </h1>
            </div>


            <div className="w-full overflow-x-auto border border-border scrollbar-hidden">
                <table className="w-full min-w-[1000px] text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-12 text-center"> No.</th>
                            <th scope="col" className="px-6 py-3 font-bold w-36">Paper ID</th>
                            <th scope="col" className="px-6 py-3 font-bold ">Paper Title</th>
                            <th scope="col" className="px-6 py-3 font-bold w-[152px]">Invited Date</th>
                            <th scope="col" className="px-6 py-3 font-bold w-32">Deadline</th>
                            <th scope="col" className="px-6 py-3 font-bold w-20 text-center">Abstract</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center w-60">Action</th>
                        </tr>
                    </thead>
                    {loading ?
                        <Skeleton /> :
                        assignments.length === 0 ? (
                            <EmptyState
                                title="pending review invitations"
                                description="You're all caught up!"
                            />

                        ) :
                            <tbody>
                                {
                                    assignments.map((item, index) => (
                                        <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-text-primary align-middle text-center">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-text-primary align-middle line">
                                                <p className='line-clamp-1'>{item.paper?.id || "N/A"}</p>
                                            </td>
                                            <td className="px-6 py-4 align-middle">
                                                <p className="text-text-primary font-medium line-clamp-1" title={item.paper?.title}>
                                                    {item.paper?.title}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-primary align-middle">
                                                {formatDate(item.invitedAt)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-text-primary align-middle">
                                                {formatDate(item.deadline)}
                                            </td>
                                            <td className="px-6 py-4 text-center align-middle">
                                                <button
                                                    className="text-primary-blue hover:underline text-xs"
                                                    onClick={() => alert(`Abstract for ${item.paper?.title}:\n\n${item.paper?.abstract || 'No abstract available.'}`)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center align-middle">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        onClick={() => handleResponse(item.id, true)}
                                                        disabled={!!processingId}
                                                        className={`bg-success/90 text-primary-foreground hover:bg-success font-medium text-xs px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1 ${processingId === item.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                    >
                                                        {processingId === item.id && responseType === 'accept' ? (
                                                            <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <Check className="w-3 h-3" />
                                                        )}
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleResponse(item.id, false)}
                                                        disabled={!!processingId}
                                                        className={`bg-danger/90 text-primary-foreground hover:bg-danger font-medium text-xs px-3 py-1.5 rounded shadow-sm transition-colors flex items-center gap-1 ${processingId === item.id ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                    >
                                                        {processingId === item.id && responseType === 'decline' ? (
                                                            <div className="w-3 h-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                                        ) : (
                                                            <X className="w-3 h-3" />
                                                        )}
                                                        Decline
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                    }
                </table>
            </div>
        </div>
    );
};

export default ReviewInvitations;
