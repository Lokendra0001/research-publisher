"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { UserPlus, Search, XCircle, AlertCircle } from 'lucide-react';
import Skeleton from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';

const RejectedInvitations = () => {
    const [assignments, setAssignments] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAssignments, setNewAssignments] = useState({}); // { assignmentId: newReviewerId }
    const [assigning, setAssigning] = useState({}); // { assignmentId: boolean }
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [assignmentsRes, reviewersRes] = await Promise.all([
                    axios.get(`${constant.SERVER_URL}admin/assignments`, {
                        params: {
                            status: ['declined', 'removed']
                        },
                        withCredentials: true
                    }),

                    axios.get(`${constant.SERVER_URL}admin/users?role=reviewer&isVerified=true`, { withCredentials: true })
                ]);

                if (assignmentsRes.data.success) {
                    setAssignments(assignmentsRes.data.data);
                }
                if (reviewersRes.data.success) {
                    setReviewers(reviewersRes.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                notify.error("Failed to load declined invitations");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleReviewerSelect = (assignmentId, reviewerId) => {
        setNewAssignments(prev => ({
            ...prev,
            [assignmentId]: reviewerId
        }));
    };

    const handleAssign = async (assignment) => {
        const newReviewerId = newAssignments[assignment.id];
        const previousAssignmentId = assignment.id;
        if (!newReviewerId) {
            notify.error("Please select a new reviewer");
            return;
        }

        // Prevent assigning to the same reviewer who declined (though backend should handle logic, it's good UX)
        if (newReviewerId === assignment.reviewer.id) {
            notify.error("Cannot reassign to the same reviewer who declined.");
            return;
        }

        try {
            setAssigning(prev => ({ ...prev, [assignment.id]: true }));
            const res = await axios.post(`${constant.SERVER_URL}admin/assignments`, {
                paperId: assignment.paper.id,
                reviewerId: newReviewerId,
                previousAssignmentId,
                isReAssign: true
            }, { withCredentials: true });

            if (res.data.success) {
                notify.success("New reviewer assigned successfully");

                setAssignments(prev => prev.filter(a => a.id !== assignment.id));
            }
        } catch (error) {
            console.error("Assignment error:", error);
            notify.error(error.response?.data?.message || "Failed to assign reviewer");
        } finally {
            setAssigning(prev => ({ ...prev, [assignment.id]: false }));
        }
    };

    const filteredAssignments = assignments.filter(a =>
        a.paper?.title?.toLowerCase().includes(filter.toLowerCase()) ||
        a.paper?.id?.toLowerCase().includes(filter.toLowerCase()) ||
        a.paper?.customId?.toLowerCase().includes(filter.toLowerCase())
    );


    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
                    Rejected Invitations
                </h1>
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Paper..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-danger/50"
                    />
                </div>
            </div>


            <div className="overflow-x-auto border border-border scrollbar-hidden">
                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-10">No.</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-38 md:min-w-38">Paper Details</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 lg:min-w-auto">Declined By</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 lg:min-w-auto">Reason</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 md:w-64 text-center">Reassign</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-border rounded w-10"></div>
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
                                        <div className="h-4 bg-border rounded w-48"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="h-8 bg-border rounded w-full"></div>
                                            <div className="h-8 bg-border rounded w-full"></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) :
                        assignments.length === 0 ? (
                            <EmptyState title='rejected invitations found' />

                        ) : (
                            <tbody>
                                {filteredAssignments.map((assignment, index) => (
                                    <tr key={assignment.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-primary align-top">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <p className="text-text-primary font-semibold mb-1 line-clamp-2" title={assignment.paper?.title}>
                                                {assignment.paper?.title}
                                            </p>
                                            <p className="text-xs text-mono text-text-primary/50">
                                                ID: {assignment.paper?.customId || assignment.paper?.id?.slice(0, 8)}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <p className="font-medium text-text-primary">{assignment.reviewer?.name}</p>
                                            <p className="text-xs text-text-primary/50">{assignment.reviewer?.institution}</p>
                                        </td>
                                        <td className="px-6 py-4 align-top text-danger italic">
                                            {new DOMParser().parseFromString(
                                                assignment.conflictReason || "",
                                                "text/html"
                                            ).body.textContent || "No reason provided"}
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex flex-col gap-2">
                                                <select
                                                    className="w-full text-sm border-border rounded-md shadow-sm focus:border-secondary/50 focus:ring-secondary/50"
                                                    value={newAssignments[assignment.id] || ""}
                                                    onChange={(e) => handleReviewerSelect(assignment.id, e.target.value)}
                                                >
                                                    <option value="">Select Reviewer...</option>
                                                    {reviewers
                                                        .filter(r => r.id !== assignment.reviewer.id) // Filter out the one who declined?
                                                        .map(reviewer => (
                                                            <option key={reviewer.id} value={reviewer.id}>
                                                                {reviewer.name}
                                                            </option>
                                                        ))}
                                                </select>
                                                <button
                                                    onClick={() => handleAssign(assignment)}
                                                    disabled={assigning[assignment.id] || !newAssignments[assignment.id]}
                                                    className={`flex items-center justify-center gap-1 w-full px-3 py-1.5 text-xs font-medium text-primary-foreground rounded transition-colors
                                                    ${assigning[assignment.id] || !newAssignments[assignment.id]
                                                            ? "bg-text-primary/40 cursor-not-allowed"
                                                            : "bg-secondary hover:bg-secondary/90 shadow-sm"
                                                        }`}
                                                >
                                                    {assigning[assignment.id] ? (
                                                        <>Assigning...</>
                                                    ) : (
                                                        <>
                                                            <UserPlus className="w-3 h-3" /> Reassign
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
                    { }
                </table>
            </div>
        </div>
    );
};

export default RejectedInvitations;
