"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { constant } from '@/utils/constant'
import { notify } from '@/utils/toast'
import { format } from 'date-fns'
import {
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    Calendar,
    ChevronDown,
    Send
} from 'lucide-react'
import Link from 'next/link'

const PendingReviews = () => {
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedAssignment, setSelectedAssignment] = useState(null) // For modal
    const [showModal, setShowModal] = useState(false)
    const [responding, setResponding] = useState({}) // { assignmentId: boolean }

    // Review Form State
    const [reviewForm, setReviewForm] = useState({
        decision: 'accepted',
        commentsToAuthor: '',
        commentsToPublisher: '',
        qualityRating: 5,
        originalityRating: 5,
        clarityRating: 5,
        methodologyRating: 5,
        relevanceRating: 5,
    })

    useEffect(() => {
        fetchAssignments()
    }, [])

    const fetchAssignments = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${constant.SERVER_URL}reviews/assignments`, {
                withCredentials: true
            })
            if (res.data.success) {
                setAssignments(res.data.data)
            }
        } catch (error) {
            console.error(error)
            notify.error('Failed to fetch assignments')
        } finally {
            setLoading(false)
        }
    }

    const handleRespond = async (id, accept) => {
        try {
            setResponding(prev => ({ ...prev, [id]: true }))
            const res = await axios.post(`${constant.SERVER_URL}reviews/${id}/respond`, {
                accept
            }, { withCredentials: true })

            if (res.data.success) {
                notify.success(accept ? 'Invitation accepted!' : 'Invitation declined')
                fetchAssignments()
            }
        } catch (error) {
            console.error(error)
            notify.error(error.response?.data?.message || 'Failed to respond')
        } finally {
            setResponding(prev => ({ ...prev, [id]: false }))
        }
    }

    const startReview = (assignment) => {
        setSelectedAssignment(assignment)
        setReviewForm({
            decision: 'accepted',
            commentsToAuthor: '',
            commentsToPublisher: '',
            qualityRating: 5,
            originalityRating: 5,
            clarityRating: 5,
            methodologyRating: 5,
            relevanceRating: 5,
        })
        setShowModal(true)
    }

    const submitReview = async () => {
        if (!selectedAssignment) return

        try {
            const res = await axios.post(`${constant.SERVER_URL}reviews/${selectedAssignment.id}/submit`, reviewForm, {
                withCredentials: true
            })

            if (res.data.success) {
                const result = await axios.patch(`${constant.SERVER_URL}papers/${res.data.data.paperId}`, { status: res.data.data.decision }, {
                    withCredentials: true
                });
                console.log(result)
                notify.success('Review submitted successfully!');
                setShowModal(false)
                fetchAssignments();
            }
        } catch (error) {
            console.error(error)
            notify.error(error.response?.data?.message || 'Failed to submit review')
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Pending Reviews</h1>

            {loading ? (
                <div className="p-12 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : assignments.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm text-center text-gray-500">
                    You have no pending reviews.
                </div>
            ) : (
                <div className="grid gap-6">
                    {assignments.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-gray-400" />
                                        {item.paper.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            Due: {format(new Date(item.deadline), 'MMM dd, yyyy')}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase
                                            ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                item.status === 'accepted' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`
                                        }>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-2 max-w-3xl">
                                        {item.paper.abstract}
                                    </p>
                                    <Link href={`${constant.SERVER_URL}${item.paper.manuscriptUrl}`} target="_blank" className="text-primary text-sm hover:underline">
                                        View Manuscript
                                    </Link>
                                </div>

                                <div className="flex flex-col justify-center min-w-[150px] gap-2">
                                    {item.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleRespond(item.id, true)}
                                                disabled={responding[item.id]}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                            >
                                                <CheckCircle className="w-4 h-4" /> Accept
                                            </button>
                                            <button
                                                onClick={() => handleRespond(item.id, false)}
                                                disabled={responding[item.id]}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                                            >
                                                <XCircle className="w-4 h-4" /> Decline
                                            </button>
                                        </>
                                    )}
                                    {item.status === 'accepted' && (
                                        <button
                                            onClick={() => startReview(item)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            <Send className="w-4 h-4" /> Submit Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Review Modal */}
            {showModal && selectedAssignment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Submit Review</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Ratings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {['qualityRating', 'originalityRating', 'clarityRating', 'methodologyRating', 'relevanceRating'].map(field => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                            {field.replace('Rating', '')} (1-10)
                                        </label>
                                        <input
                                            type="number"
                                            min="1" max="10"
                                            value={reviewForm[field]}
                                            onChange={e => setReviewForm({ ...reviewForm, [field]: parseInt(e.target.value) })}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Comments */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Comments to Author</label>
                                    <textarea
                                        rows="4"
                                        value={reviewForm.commentsToAuthor}
                                        onChange={e => setReviewForm({ ...reviewForm, commentsToAuthor: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                        placeholder="Constructive feedback for the author..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Internal Comments (Optional)</label>
                                    <textarea
                                        rows="2"
                                        value={reviewForm.commentsToPublisher}
                                        onChange={e => setReviewForm({ ...reviewForm, commentsToPublisher: e.target.value })}
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                        placeholder="Confidential notes for the editor..."
                                    />
                                </div>
                            </div>

                            {/* Decision */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Recommendation</label>
                                <select
                                    value={reviewForm.decision}
                                    onChange={e => setReviewForm({ ...reviewForm, decision: e.target.value })}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                >
                                    <option value="accepted">Accept</option>
                                    <option value="minor_reject">Minor Revision</option>
                                    <option value="rejected">Reject</option>
                                </select>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitReview}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                            >
                                Submit Decision
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PendingReviews
