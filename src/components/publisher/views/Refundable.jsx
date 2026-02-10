"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { constant } from '@/utils/constant';
import { notify } from '@/utils/toast';
import { Search, Download, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import EmptyState from '@/components/common/EmptyState';

const Refundable = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [processingRefund, setProcessingRefund] = useState({});

    useEffect(() => {
        fetchRefundablePayments();
    }, []);

    const fetchRefundablePayments = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${constant.SERVER_URL}admin/refundable-payments`, {
                withCredentials: true
            });

            if (res.data.success) {
                setPayments(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching refundable payments:', error);
            notify.error('Failed to load refundable payments');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-GB");
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleRefund = async (paperId, paymentId) => {
        if (!paperId) return;
        try {
            setProcessingRefund((prev) => (
                {
                    ...prev,
                    [paymentId]: !processingRefund[paymentId]
                }
            ))
            const res = await axios.patch(`${constant.SERVER_URL}admin/refund`, { paperId }, { withCredentials: true });
            if (res.data.success) {
                setPayments(payments.filter(payment => payment.paper.id !== paperId));
                notify.success(res.data.message || "Refund Queued Successfully!")
            }
        } catch (error) {
            console.log(error)
            notify.error(error.message)
        }
    }


    const filteredPayments = payments.filter(item =>
        item.paper?.title?.toLowerCase().includes(filter.toLowerCase()) ||
        item.author?.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.payerEmail?.toLowerCase().includes(filter.toLowerCase()) ||
        (item.paper?.id && item.paper.id.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <div className="bg-primary-foreground p-2 md:p-6 shadow-sm rounded-lg border border-border min-h-[500px]">
            <div className="border-b border-border pb-2 mb-6 flex flex-col sm:flex-row justify-between md:items-center gap-4">
                <h1 className="text-2xl font-bold text-secondary">
                    Refundable Payments
                </h1>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-primary/60 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Paper or Author..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50"
                    />
                </div>
            </div>

            <div className="overflow-x-auto border border-border scrollbar-hidden">


                <table className="w-full text-sm text-left text-text-primary/50">
                    <thead className="text-xs text-text-primary/70 uppercase bg-muted/50 border-b border-border">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold text-center w-14">No.</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center min-w-40 lg:min-w-35">Paper Title</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center min-w-[120px]">Amount Paid</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center min-w-[120px]">Refund Amount</th>
                            <th scope="col" className="px-6 py-3 font-bold text-center min-w-[152px]">Payment Date</th>
                            <th scope="col" className="px-4 py-3 font-bold text-center ">Refund</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i} className="animate-pulse border-b border-border/50">
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-border rounded w-8"></div>
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
                                        <div className="h-4 bg-border rounded w-20"></div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="h-4 bg-border rounded w-20"></div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="h-8 w-8 bg-border rounded-full mx-auto"></div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    ) : payments.length === 0 ? (
                        <EmptyState
                            icon={RefreshCcw}
                            title="refundable payments"
                            className="bg-gray-50 rounded-lg border border-dashed border-gray-300"
                            colSpan='6'
                        />
                    ) : (
                        <tbody>
                            {filteredPayments.map((payment, index) => (
                                <tr key={payment.id} className="bg-primary-foreground border-b border-border/50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-text-primary align-middle">
                                        {index + 1}
                                    </td>


                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-text-primary font-medium">{payment.author?.name || payment.payerName || "Unknown"}</p>
                                        <p className="text-xs text-text-primary/50 mt-1">{payment.payerEmail || "N/A"}</p>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-text-primary font-semibold text-center">{formatCurrency(payment.amount)}</p>
                                    </td>
                                    <td className="px-6 py-4 align-middle">
                                        <p className="text-warning font-semibold text-center">{formatCurrency(payment.refundAmt || 0)}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-text-primary align-middle text-center">
                                        {formatDate(payment.paidAt || payment.createdAt)}
                                    </td>

                                    <td className="text-center ">
                                        <button
                                            onClick={() => handleRefund(payment.paper?.id, payment.id)}
                                            disabled={processingRefund[payment.id]}
                                            className={`inline-block font-medium text-xs border px-3 py-1 rounded transition-colors ${processingRefund[payment.id]
                                                ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
                                                : 'bg-warning/85 text-text-secondary hover:bg-warning border-warning cursor-pointer'
                                                }`}
                                        >
                                            {/* {payment?.refundStatus} */}
                                            {processingRefund[payment.id] ? 'Processing...' : 'Refund'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Refundable;
