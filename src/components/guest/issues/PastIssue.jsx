"use client";
import React, { useEffect, useState } from 'react';
import IssuesSidebar from './IssuesSidebar';
import PaperCard from '@/components/paper/PaperCard';
import Pagination from '@/components/common/Pagination';
import { notify } from '@/utils/toast';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { FileText } from 'lucide-react';

const PastIssue = () => {
    // const [selectedVolIssue, setSelectedVolIssue] = useState({ volId: "", issueId: "" })
    const [selectedVolIssue, setSelectedVolIssue] = useState({ volId: "10fc7ffa-726c-49e4-9128-b82af176fe5f", issueId: "bb3b383b-6cbd-427f-8544-2435728766f9" })
    const [lastFetchedIds, setLastFetchedIds] = useState({volId : null, issueId : null })

    const [papers, setPapers] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleGetPapers = async () => {
        try {
            if (
                lastFetchedIds.volId === selectedVolIssue.volId &&
                lastFetchedIds.issueId === selectedVolIssue.issueId
            ) {
                return;
            }
            setLoading(true);
            if (selectedVolIssue?.volId && selectedVolIssue?.issueId) {
                const res = await axios.get(`${constant.SERVER_URL}public/get-pastIssuePapers?vId=${selectedVolIssue.volId}&iId=${selectedVolIssue.issueId}`, { withCredentials: true });
                setPapers(res.data.data)
                setCurrentPage(1);
                setLastFetchedIds({ volId: selectedVolIssue.volId, issueId: selectedVolIssue.issueId });

            }
        } catch (error) {
            notify.error(error.message)
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        handleGetPapers();
    }, [selectedVolIssue])

    // Pagination logic
    const totalPages = Math.ceil(papers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPapers = papers.slice(indexOfFirstItem, indexOfLastItem);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-primary-foreground min-h-screen border-t border-border">
            <div className="container mx-auto py-5 md:py-10 md:px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Left Sidebar */}
                    <div className="md:col-span-3">
                        <IssuesSidebar
                            onSelectIssue={setSelectedVolIssue}
                            selectedIssueId={selectedVolIssue?.issueId}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-9">
                        <div className="space-y-6">
                            {loading ? (
                                // Skeleton Loader for Papers
                                [...Array(3)].map((_, index) => (
                                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border animate-pulse">
                                        <div className="h-6 bg-border rounded w-3/4 mb-4"></div>
                                        <div className="h-4 bg-border rounded w-1/2 mb-2"></div>
                                        <div className="h-4 bg-border rounded w-1/3 mb-4"></div>
                                        <div className="h-20 bg-border rounded w-full mb-4"></div>
                                        <div className="flex justify-between items-center">
                                            <div className="h-8 bg-border rounded w-24"></div>
                                            <div className="h-4 bg-border rounded w-24"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {currentPapers.map((paper, idx) => (
                                        <PaperCard key={idx} paper={paper} path='past' />
                                    ))}

                                    {/* Pagination Controls */}
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                    />
                                </>
                            )}

                            {!loading && selectedVolIssue?.issueId === "" ?
                                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-50/50">
                                    <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50">
                                        <FileText size={25} className='text-primary' />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Issue Selected</h3>
                                    <p className="text-gray-500 max-w-md">Select an issue from the list to view details.</p>
                                </div> :
                                papers.length === 0 && (
                                    <div className="text-center py-10 text-text-primary/70 border border-dashed rounded-lg bg-white">
                                        No papers found in this issue.
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastIssue;
