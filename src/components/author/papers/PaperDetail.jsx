"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { constant } from '@/utils/constant'
import { format } from 'date-fns'
import {
    FileText,
    Download,
    Calendar,
    Tag,
    BookOpen,
    Layers,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Eye,
    ArrowLeft,
    User,
    Building,
    Globe
} from 'lucide-react'


const PaperDetail = () => {
    const { paperId } = useParams()
    const [paper, setPaper] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const router = useRouter();


    useEffect(() => {
        if (paperId) fetchPaperDetail()
    }, [paperId])

    const fetchPaperDetail = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${constant.SERVER_URL}public/papers/${paperId}`, {
                withCredentials: true
            })

            if (res.data.success) {
                setPaper(res.data.data)
            }
        } catch (err) {
            console.log(err)
            setError('Failed to fetch paper details')
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status) => {
        const styles = {
            submitted: "bg-blue-50 text-blue-700 border-blue-200",
            under_review: "bg-yellow-50 text-yellow-700 border-yellow-200",
            accepted: "bg-green-50 text-green-700 border-green-200",
            rejected: "bg-red-50 text-red-700 border-red-200",
            published: "bg-primary/10 text-primary border-primary/20",
            minor_revision: "bg-orange-50 text-orange-700 border-orange-200"
        }

        const icons = {
            submitted: <Clock className="w-3.5 h-3.5 mr-1.5" />,
            under_review: <Eye className="w-3.5 h-3.5 mr-1.5" />,
            accepted: <CheckCircle className="w-3.5 h-3.5 mr-1.5" />,
            rejected: <XCircle className="w-3.5 h-3.5 mr-1.5" />,
            published: <FileText className="w-3.5 h-3.5 mr-1.5" />,
            minor_revision: <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${styles[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                {icons[status]}
                {status?.replace('_', ' ').toUpperCase()}
            </span>
        )
    }

    // Date Logic
    const getDisplayDate = (p) => {
        if (p.publishedAt) return { label: "Published on", date: p.publishedAt };
        if (p.status === 'accepted' || p.acceptedAt) return { label: "Accepted on", date: p.updatedAt }; // Assuming updated is roughly accepted if status is accepted
        return { label: "Last Updated", date: p.updatedAt || p.createdAt };
    }


    if (loading) {
        return (
            <div className="bg-gray-50/50 min-h-screen">
                <div className="container mx-auto md:px-4 py-10 max-w-6xl">
                    {/* Back Button Skeleton */}
                    <div className="w-32 h-6 bg-gray-200 rounded mb-6 animate-pulse"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content Skeleton */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Header Card Skeleton */}
                            <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-8 space-y-4">
                                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-3/4 h-10 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                    <div className="space-y-2">
                                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Abstract Section Skeleton */}
                            <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-8 space-y-4">
                                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 mt-8">
                                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div className="flex gap-2">
                                        <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-28 h-8 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Skeleton */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Download Card Skeleton */}
                            <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-6 space-y-4">
                                <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-full h-20 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            {/* Author Details Skeleton */}
                            <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-6 space-y-4">
                                <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="space-y-1 flex-1">
                                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-100 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="space-y-1 flex-1">
                                            <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-28 h-2 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="space-y-1 flex-1">
                                            <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-28 h-2 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !paper) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl inline-block shadow-sm border border-red-100">
                    <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-80" />
                    <p className="font-medium">{error || "Paper not found"}</p>
                </div>
            </div>
        )
    }

    const { label: dateLabel, date: displayDate } = getDisplayDate(paper);

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container mx-auto md:px-4 py-10 max-w-6xl">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                >
                    <div className="p-1.5 rounded-full bg-white border border-gray-200 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    Back to Papers
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Header Card */}
                        <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-4 md:p-8 relative overflow-hidden">
                            {/* Decorative gradient top bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 to-primary/20"></div>

                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {getStatusBadge(paper.status)}
                                <span className="text-xs font-mono text-gray-400">#{paper.id.slice(0, 8)}</span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
                                {paper.title}
                            </h1>

                            <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-100">
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="font-medium text-gray-700">{dateLabel}:</span>
                                    {format(new Date(displayDate), 'MMMM dd, yyyy')}
                                </span>
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                <div className="space-y-1">
                                    <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Research Type</div>
                                    <div className="text-sm md:text-base flex items-center gap-2 font-medium text-gray-800">
                                        <BookOpen className="w-4 h-4 text-primary/70" />
                                        {paper.researchType || 'Original Research'}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Category</div>
                                    <div className="text-sm md:text-base flex items-center gap-2 font-medium text-gray-800">
                                        <Layers className="w-4 h-4 text-primary/70" />
                                        {paper.category || 'General'}
                                    </div>
                                </div>
                                {paper.subCategory && (
                                    <div className="space-y-1">
                                        <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Sub-Category</div>
                                        <div className="text-sm md:text-base font-medium text-gray-800">
                                            {paper.subCategory}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Abstract Section */}
                        <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-4 md:p-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                    <FileText className="w-5 h-5" />
                                </div>
                                Abstract
                            </h2>
                            <p className="text-sm md:text-base text-gray-600 leading-8 text-justify">
                                {paper.abstract}
                            </p>

                            {/* Keywords */}
                            {paper.keywords && paper.keywords.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Tag className="w-3.5 h-3.5" />
                                        Keywords
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.isArray(paper.keywords) ? paper.keywords.map((keyword, index) => (
                                            <span key={index} className="px-3 py-1.5 bg-gray-50 hover:bg-primary/5 text-gray-600 hover:text-primary text-xs md:text-sm rounded-xs border border-gray-200 transition-colors">
                                                {typeof keyword === 'string' ? keyword : keyword.label || JSON.stringify(keyword)}
                                            </span>
                                        )) : (
                                            <span className="text-gray-500 text-sm italic">No keywords</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>


                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Action Card - Download */}
                        <div className="bg-gradient-to-br from-primary/5 to-white rounded-xs shadow-sm border border-primary/10  p-4 md:p-6">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Download className="w-4 h-4 text-primary" />
                                Access Paper
                            </h3>

                            <div className="bg-white rounded-lg md:rounded-xl p-4 border border-gray-100 shadow-sm mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2.5 bg-green-50 rounded-xs">
                                        <FileText className="w-5 h-5 text-success" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate" title={paper.manuscriptName}>
                                            {paper.manuscriptName || "Full_Text.pdf"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PDF • {(paper.manuscriptSize / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={`${paper.manuscriptUrl}`}
                                download={true}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 px-4 rounded-lg md:rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                            >
                                <Download className="w-4 h-4" />
                                Download Full Text PDF
                            </a>
                        </div>

                        {/* Authors Card */}
                        <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-4 md:p-6">
                            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Author Details
                            </h3>

                            {/* Primary Author (from paper.author relationship usually, but if not populated, rely on co-authors or logic) */}
                            {paper.author && (
                                <div className="mb-6 last:mb-0">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                            {paper.author.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                {paper.author.name}
                                                <span className="text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Corresp.</span>
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">{paper.author.email}</p>
                                            <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded-xs">
                                                <Building className="w-3 h-3 text-gray-400" />
                                                {paper.author.institution || "Institution not provided"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Co-Authors */}
                            {paper.coAuthors && paper.coAuthors.length > 0 && (
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Co-Authors</p>
                                    {Array.isArray(paper.coAuthors) && paper.coAuthors.map((author, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                                                {author.name ? author.name.charAt(0).toUpperCase() : 'A'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{author.name}</p>
                                                <p className="text-xs text-gray-500">{author.email}</p>
                                                {author.institution && (
                                                    <p className="text-xs text-gray-400 mt-0.5">{author.institution}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Citation / Info Card (Optional Placeholder) */}
                        <div className="bg-white rounded-xs shadow-sm border border-gray-100 p-4 md:p-6">
                            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                Publication Details
                            </h3>
                            <div className="text-sm text-gray-600 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Volume</span>
                                    <span className="font-medium">{paper.volume?.volumeNumber || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Issue</span>
                                    <span className="font-medium">{paper.issue?.issueNumber || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Year</span>
                                    <span className="font-medium">{paper.volume?.year || new Date().getFullYear()}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaperDetail
