"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Award, Download, Search } from 'lucide-react';
import EmptyState from '@/components/common/EmptyState';

const MyCertificate = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                setLoading(true);
                // Fetch papers where certificates have been generated
                const res = await axios.get(`${constant.SERVER_URL}papers?certificateGenerated=true`, { withCredentials: true });

                if (res.data.success) {
                    setPapers(res.data.data.papers);
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
                notify.error("Failed to load certificates");
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    const filteredPapers = papers.filter(item =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        (item.id && item.id.toLowerCase().includes(filter.toLowerCase()))
    );

    const handleDownloadCertificate = (certificateUrl, paperTitle) => {
        if (certificateUrl) {
            window.open(certificateUrl, '_blank');
        } else {
            notify.error("Certificate not available");
        }
    };

    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <div className="flex items-center gap-3">
                    <Award className="w-7 h-7 text-secondary" />
                    <h1 className="text-2xl font-bold text-secondary">
                        My Certificates
                    </h1>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search papers..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        disabled={loading}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-border scrollbar-hidden">
                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-4 py-3 font-bold  w-10">No.</th>
                            <th scope="col" className="px-4 py-3 font-bold  min-w-64 text-center">Paper Title</th>
                            <th scope="col" className="px-4 py-3 font-bold  min-w-32 whitespace-nowrap">Vol/Issue</th>
                            <th scope="col" className="px-4 py-3 font-bold  min-w-28 whitespace-nowrap">Published Date</th>
                            <th scope="col" className="px-4 py-3 font-bold  min-w-32 text-center">Certificate</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-4 py-4 w-10">
                                        <div className="h-4 bg-border rounded w-8"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-border rounded w-3/4"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-border rounded w-24"></div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="h-4 bg-border rounded w-28"></div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="h-9 bg-border rounded w-32 mx-auto"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : filteredPapers.length === 0 ? (
                        <EmptyState
                            icon={Award}
                            title="certificates "
                            colSpan='5'
                        />
                    ) : (
                        <tbody>
                            {filteredPapers.map((item, index) => (
                                <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 w-10 font-medium text-text-primary align-middle">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-4 align-middle">
                                        <p className="text-text-primary font-medium line-clamp-2" title={item.title}>
                                            {item.title}
                                        </p>
                                    </td>
                                    <td className="px-4 py-4 align-middle whitespace-nowrap">
                                        {item.volume ? (
                                            <div className="text-xs">
                                                <p className="font-semibold text-text-primary">Vol {item.volume.volumeNumber}</p>
                                                {item.issue && <p className="text-text-primary/50">Issue {item.issue.issueNumber}</p>}
                                            </div>
                                        ) : (
                                            <span className="text-text-primary/50">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 align-middle whitespace-nowrap text-text-primary">
                                        {item.publishedAt
                                            ? new Date(item.publishedAt).toLocaleDateString("en-GB")
                                            : new Date(item.updatedAt).toLocaleDateString("en-GB")
                                        }
                                    </td>
                                    <td className="px-4 py-4 text-center align-middle">
                                        <button
                                            onClick={() => handleDownloadCertificate(item.certificateUrl, item.title)}
                                            disabled={!item.certificateUrl}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-text-secondary font-medium hover:bg-secondary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {!loading && papers.length > 0 && (
                <div className="mt-4 text-sm text-text-primary/60 text-center">
                    Total Certificates: <span className="font-semibold text-text-primary">{papers.length}</span>
                </div>
            )}
        </div>
    );
};

export default MyCertificate;
