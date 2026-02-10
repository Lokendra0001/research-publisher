"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Loader2, Check, X, Download } from 'lucide-react';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';

const ApproveReviewers = () => {
    const [reviewers, setReviewers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchReviewers = async () => {
        try {
            const response = await axios.get(`${constant.SERVER_URL}/users/reviewers/unverified`);
            if (response.data.success) {
                setReviewers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching reviewers:", error);
            notify.error("Failed to fetch unverified reviewers.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviewers();
    }, []);

    const handleVerify = async (id, isApproved) => {
        setProcessingId(id);
        try {
            const response = await axios.post(`${constant.SERVER_URL}/users/reviewers/${id}/verify`, {
                approve: isApproved
            });

            if (response.data.success) {
                notify.success(isApproved ? "Reviewer approved successfully." : "Reviewer request rejected.");
                // Remove from list
                setReviewers(prev => prev.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Error verifying reviewer:", error);
            notify.error("Failed to process request.");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[400px]">
            <div className="border-b border-border pb-2 mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-secondary">Approve Reviewers</h1>
                <span className="bg-warning/20 text-warning text-sm font-medium px-3 py-1 rounded-full">
                    Pending: {reviewers.length}
                </span>
            </div>

            <div className="overflow-x-auto border border-border scrollbar-hidden">
                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th className="px-6 py-3 font-bold w-48">Name</th>
                            <th className="px-6 py-3 font-bold w-56">Email</th>
                            <th className="px-6 py-3 font-bold w-52">Institution</th>
                            <th className="px-6 py-3 font-bold w-40">Designation</th>
                            <th className="px-6 py-3 font-bold text-center w-20">CV</th>
                            <th className="px-6 py-3 font-bold text-center w-32">Actions</th>
                        </tr>
                    </thead>

                    {isLoading ?
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-6 py-4 w-48">
                                        <div className="h-4 bg-border rounded w-3/4"></div>
                                    </td>
                                    <td className="px-6 py-4 w-56">
                                        <div className="h-4 bg-border rounded w-full"></div>
                                    </td>
                                    <td className="px-6 py-4 w-52">
                                        <div className="h-4 bg-border rounded w-4/5"></div>
                                    </td>
                                    <td className="px-6 py-4 w-40">
                                        <div className="h-4 bg-border rounded w-3/4"></div>
                                    </td>
                                    <td className="px-6 py-4 w-20 text-center">
                                        <div className="h-6 w-6 bg-border rounded mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 w-32">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-8 w-8 bg-border rounded-full"></div>
                                            <div className="h-8 w-8 bg-border rounded-full"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        :
                        reviewers.length === 0 ? (
                            <EmptyState
                                title='pending reviewer approvals.'
                                className=''
                            />
                        ) : (
                            <tbody>
                                {reviewers.map((reviewer) => (
                                    <tr key={reviewer.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 w-48 font-medium text-text-primary text-sm">{reviewer.name}</td>
                                        <td className="px-6 py-4 w-56 text-text-primary/70 text-sm">{reviewer.email}</td>
                                        <td className="px-6 py-4 w-52 text-text-primary/70 text-sm">{reviewer.institution || '-'}</td>
                                        <td className="px-6 py-4 w-40 text-text-primary/70 text-sm">{reviewer.designation || '-'}</td>
                                        <td className="px-6 py-4 w-20 text-center">
                                            {reviewer.cvUrl ? (
                                                <a
                                                    href={reviewer.cvUrl}
                                                    target='_blank'
                                                    rel="noopener noreferrer"
                                                    download
                                                    className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/10 text-primary-blue/80 hover:bg-primary-blue/20 hover:text-primary-blue transition-colors'
                                                    title="Download CV"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <span className="text-text-primary/50 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 w-32">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleVerify(reviewer.id, true)}
                                                    disabled={processingId === reviewer.id}
                                                    className="p-2 bg-success/20 text-success rounded-full hover:bg-success/30 transition-colors disabled:opacity-50"
                                                    title="Approve"
                                                >
                                                    {processingId === reviewer.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleVerify(reviewer.id, false)}
                                                    disabled={processingId === reviewer.id}
                                                    className="p-2 bg-danger/20 text-danger rounded-full hover:bg-danger/30 transition-colors disabled:opacity-50"
                                                    title="Reject"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                </table>
            </div>
        </div >
    );
};

export default ApproveReviewers;
