'use client'
import React, { useEffect, useState } from 'react';
import { Search, Download, Eye } from 'lucide-react';
import { notify } from '@/utils/toast';
import axios from 'axios';
import { constant } from '@/utils/constant';

const PaymentHistory = () => {
    const [filter, setFilter] = useState('');
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilterPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${constant.SERVER_URL}admin/payment-history`, { withCredentials: true });
            if (res.data.success) {
                setPayments(res.data.payments);
                setFilterPayments(res.data.payments);
            }
        } catch (error) {
            notify.error(error?.response?.data?.message || error.message || "Failed to fetch Payment!")
        } finally {
            setLoading(false);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const runFilter = () => {
        if (!filter.trim()) {
            setFilterPayments(payments);
            return;
        }
        const search = filter.toLowerCase().trim();
        const fPayments = payments.filter((payment) =>
            payment.payerName?.toLowerCase().includes(search) ||
            payment.payerEmail?.toLowerCase().includes(search) ||
            payment.paper?.id?.toLowerCase().includes(search) ||
            payment.amount?.toString().includes(search) ||
            payment.date?.toString().includes(search) ||
            payment.payuMode?.toString().includes(search)
        );
        setFilterPayments(fPayments);
    };


    useEffect(() => {
        runFilter();
    }, [filter, payments]);

    useEffect(() => {
        fetchPayments();
    }, [])

    return (
        <div className="bg-primary-foreground p-2 md:p-6  shadow-sm rounded-lg border border-border min-h-[500px] max-w-6xl my-10">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary">
                    Payment History
                </h1>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Transaction..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-border scrollbar-hidden rounded-md">
                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold w-14">No.</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 lg:min-w-auto">Paper Title</th>
                            <th scope="col" className="px-6 py-3 font-bold min-w-40 lg:min-w-auto">Author Name</th>
                            <th scope="col" className="px-6 py-3 font-bold ">Ref ID</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Proof</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Mode</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Status</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="h-6 w-12 bg-gray-200 rounded mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="h-6 w-16 bg-gray-200 rounded-full mx-auto"></div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                                    </td>
                                </tr>
                            ))
                        ) : filteredPayments.length > 0 ? (
                            filteredPayments.map((item, index) => (
                                <tr key={item.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary align-middle">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-text-primary font-medium line-clamp-1" title={item.paperTitle}>
                                            {item.paperTitle || "Unknown Paper"}
                                        </p>
                                        <p className="text-xs text-mono text-text-primary/50 mt-1 line-clamp-1">
                                            ID: {item.id || "N/A"}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-text-primary font-medium">{item?.payerName}</p>
                                        <p className="text-xs text-text-primary/50">{item?.payerEmail}</p>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-[10px] text-text-primary align-middle whitespace-nowrap opacity-60">
                                        {item.transactionId || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-center align-middle">
                                        {item.screenshotUrl ? (
                                            <a
                                                href={item.screenshotUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-success/10 text-success hover:bg-success/20 transition-colors border border-success/20"
                                                title="View Payment Proof"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-text-primary/20">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center align-middle">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight border ${item.payuMode === 'Manual' ? 'bg-orange-50 text-orange-600 border-orange-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                                            {item?.payuMode || "Online"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center align-middle">
                                        <span className={`bg-success/10 text-success border border-success/50 px-2 py-1 rounded-full text-xs font-medium  capitalize`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-primary align-middle text-center">
                                        {formatDate(item?.updatedAt)}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-6 py-8 text-center text-text-primary/40">
                                    No payments found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentHistory