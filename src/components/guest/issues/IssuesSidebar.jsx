"use client";
import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react';
import { notify } from '@/utils/toast';
import axios from 'axios';
import { constant } from '@/utils/constant';

const IssuesSidebar = ({ onSelectIssue, selectedIssueId }) => {
    // Dummy Data for Volumes and Issues
    const [volumes, setVolumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedVolumes, setExpandedVolumes] = useState({});

    const toggleVolume = (volId) => {
        setExpandedVolumes(prev => ({
            ...prev,
            [volId]: !prev[volId]
        }));
    };

    const getVolumeAndIssues = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}public/get-pastIssues`, { withCredentials: true });
            if (res.data.status) {
                setVolumes(res.data.data);
                console.log(res.data.data)
                // Auto-expand the first volume (most recent)
                if (res.data.data.length > 0) {
                    setExpandedVolumes({ [res.data.data[0].id]: true });
                }
            }
        } catch (error) {
            notify.error(error.response?.data?.message || "Failed to fetch archives");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVolumeAndIssues();
    }, [])

    return (
        <div className="w-full bg-white border-r border-gray-200 h-full">
            <div className="p-4 bg-blue-950 text-white font-bold text-lg">
                Volume
            </div>
            <div className="p-2 space-y-2">
                {loading ? (
                    // Skeleton Loader
                    [...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse space-y-2 mb-4">
                            <div className="h-10 bg-gray-200 rounded w-full"></div>
                            {index === 0 && (
                                <div className="pl-4 space-y-2">
                                    <div className="h-8 bg-gray-100 rounded w-full"></div>
                                    <div className="h-8 bg-gray-100 rounded w-full"></div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    volumes.map((vol) => (
                        <div key={vol.id} className="border-b border-gray-100 last:border-0 pb-2">
                            <button
                                onClick={() => toggleVolume(vol.id)}
                                className="flex items-center justify-between w-full text-left text-blue-600 font-semibold hover:text-blue-800 transition-colors py-2 px-2 rounded hover:bg-gray-50"
                            >
                                <span className="text-sm">{vol.name}</span>
                                <ChevronDown className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${expandedVolumes[vol.id] ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedVolumes[vol.id] && (
                                <div className="ml-4 space-y-1 mt-1 transition-all duration-300 ease-in-out">
                                    {vol.issues.map((issue) => (
                                        <button
                                            key={issue.id}
                                            onClick={() => onSelectIssue({
                                                volId: vol.id,
                                                issueId: issue.id
                                            })}
                                            className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors border ${selectedIssueId === issue.id
                                                ? 'bg-blue-50 text-blue-700 font-medium border-blue-200 shadow-sm'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 border-transparent'
                                                }`}
                                        >
                                            {issue.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default IssuesSidebar;
