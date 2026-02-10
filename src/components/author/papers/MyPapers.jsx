"use client"
import React, { useEffect, useState } from 'react'
import { constant } from '@/utils/constant'
import axios from 'axios'
import Link from 'next/link'
import { FileText, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

const MyPapers = () => {
    const [papers, setPapers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [statusFilter, setStatusFilter] = useState('submitted')

    useEffect(() => {
        fetchMyPapers()
    }, [statusFilter])

    const fetchMyPapers = async () => {
        try {
            setLoading(true)
            const query = statusFilter ? `?status=${statusFilter}` : ''
            const res = await axios.get(`${constant.SERVER_URL}papers${query}`, {
                withCredentials: true
            })
            if (res.data.success) {
                setPapers(res.data.data.papers)
            }
        } catch (err) {
            console.log(err)
            setError('Failed to fetch papers')
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status) => {
        const styles = {
            submitted: "bg-blue-100 text-blue-800",
            under_review: "bg-yellow-100 text-yellow-800",
            accepted: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            published: "bg-purple-100 text-purple-800",
            minor_revision: "bg-orange-100 text-orange-800"
        }

        const icons = {
            submitted: <Clock className="w-4 h-4 mr-1" />,
            under_review: <Eye className="w-4 h-4 mr-1" />,
            accepted: <CheckCircle className="w-4 h-4 mr-1" />,
            rejected: <XCircle className="w-4 h-4 mr-1" />,
            published: <FileText className="w-4 h-4 mr-1" />,
            minor_revision: <AlertCircle className="w-4 h-4 mr-1" />
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>
                {icons[status]}
                {status?.replace('_', ' ').toUpperCase()}
            </span>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        My Research Papers
                    </h1>
                    <p className="text-gray-500 mt-2">Manage and track your paper submissions</p>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-gray-700 font-medium"
                    >
                        <option value="">All Statuses</option>
                        <option value="submitted">Submitted</option>
                        <option value="under_review">Under Review</option>
                        <option value="accepted">Accepted</option>
                        <option value="published">Published</option>
                        <option value="rejected">Rejected</option>
                        <option value="minor_revision">Minor Revision</option>
                    </select>

                    <Link
                        href="/author/submit"
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
                    >
                        <FileText className="w-4 h-4" />
                        Submit New Paper
                    </Link>
                </div>
            </div>

            {papers.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No papers found</h3>
                    <p className="text-gray-500 mt-1 mb-6">Start your journey by submitting your first research paper</p>
                    <Link
                        href="/author/submit"
                        className="text-primary font-medium hover:underline"
                    >
                        Submit a paper now &rarr;
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {papers.map((paper) => (
                                    <tr key={paper.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 line-clamp-2" title={paper.title}>
                                                {paper.title}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                ID: {paper.id.slice(0, 8)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(paper.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {format(new Date(paper.submittedAt), 'MMM dd, yyyy')}
                                        </td>


                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">

                                            {paper.status == "accepted" ?
                                                <button className='bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded-sm cursor-pointer'>
                                                    Pay Now
                                                </button> : <Link
                                                    href={`/author/papers/${paper.id}`}
                                                    className="text-primary hover:text-primary/70 flex items-center gap-1"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </Link>
                                            }

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyPapers
