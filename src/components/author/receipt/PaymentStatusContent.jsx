'use client'
import React, { useEffect, useState, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { constant } from '@/utils/constant'
import { CheckCircle, XCircle, Home, Loader2, Download } from 'lucide-react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReceiptPDF from './Receipt'

// Main Component
const PaymentStatusContent = () => {
    const { status } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const paymentId = searchParams.get('paymentId');
    const paramId = searchParams.get('id'); // Fallback for failure case
    const errorMsg = searchParams.get('error');

    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(status === 'success');

    // For failure case specifically
    const [failedTxnId, setFailedTxnId] = useState(paramId);

    useEffect(() => {
        if (status === 'success' && paymentId) {
            fetchPaymentDetails();
        } else if (status === 'failure' && paramId) {
            // Optional: fetch failed payment info if needed, but usually just showing error is enough
            setFailedTxnId(paramId);
        }
    }, [status, paymentId, paramId]);

    const fetchPaymentDetails = async () => {
        try {
            const res = await axios.get(`${constant.SERVER_URL}payment/${paymentId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setPaymentData(res.data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Retrieving Receipt...</p>
            </div>
        );
    }

    const isSuccess = status === 'success';

    // Only return "Payment data not found" if it's a success case but no data (loading finished)
    if (isSuccess && !paymentData && !loading) return <div className="min-h-screen flex items-center justify-center">Payment data not found</div>

    return (
        <div className="min-h-screen  flex items-center justify-center mt-5 md:p-6">
            <div className={`bg-white rounded-lg shadow-sm w-full max-w-7xl overflow-hidden border border-border '} flex flex-col lg:flex-row`}>

                {/* Left Side: Receipt Details (Main Content) */}
                <div className="flex-1 p-4 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSuccess ? 'bg-secondary/10' : 'bg-red-50'}`}>
                            {isSuccess ?
                                <CheckCircle className="w-6 h-6 text-secondary" /> :
                                <XCircle className="w-6 h-6 text-red-500" />
                            }
                        </div>
                        <div>
                            <h1 className={`text-2xl font-bold ${isSuccess ? 'text-gray-900' : 'text-danger'}`}>
                                {isSuccess ? 'Payment Successful' : 'Payment Failed'}
                            </h1>
                            <p className="text-gray-500 text-xs md:text-sm">
                                {isSuccess ? `Receipt #${paymentData?.id || 'N/A'}` : 'Transaction could not be completed'}
                            </p>
                        </div>
                    </div>

                    {isSuccess ? (
                        <div className="space-y-8">
                            {/* Payer & Paper Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Billed To</h3>
                                    <div>
                                        <div className="text-lg font-bold text-gray-900">{paymentData?.payerName || 'Author'}</div>
                                        <div className="text-gray-600">{paymentData?.payerEmail || ''}</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">For Manuscript</h3>
                                    <div>
                                        <div className="text-gray-900 font-medium italic mb-1">"{paymentData?.paper?.title || 'Unknown Title'}"</div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                            ID: {paymentData?.paperId?.slice(0, 8)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Line Items Table Look */}
                            <div className="mt-8">
                                <div className="border-b border-gray-200 pb-2 mb-4">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Description</h3>
                                </div>
                                <div className="flex  justify-between items-center  py-4 border-b border-gray-100">
                                    <div>
                                        <p className="font-bold text-gray-900">Paper Processing Charge</p>
                                        <p className="text-xs md:text-sm text-gray-500">Standard publication fee for accepted manuscript</p>
                                    </div>
                                    <div className=" text-xl font-bold text-gray-900  shrink-0">₹ {paymentData?.amount || '0.00'}</div>
                                </div>
                                <div className="flex justify-between items-center py-4">
                                    <p className="font-bold text-gray-500">Total Paid</p>
                                    <p className="text-2xl md:text-3xl font-bold text-secondary">₹ {paymentData?.amount || '0.00'} </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                                <h3 className="text-red-900 font-bold mb-2">Error Details</h3>
                                <p className="text-red-700">
                                    {errorMsg || "We couldn't process your payment. Please try again or contact support if the issue persists."}
                                </p>
                            </div>
                            {failedTxnId && (
                                <div>
                                    <span className="text-gray-500 text-sm block mb-1">Reference ID</span>
                                    <span className="font-mono bg-gray-100 px-3 py-1 rounded text-gray-700">{failedTxnId}</span>
                                </div>
                            )}
                            <p className="text-gray-600">
                                If money was deducted from your account, please wait for 30 minutes for the status to update or contact our support with the Reference ID above.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Side: Sidebar (Summary & Actions) */}
                <div className="w-full md:w-96 bg-secondary/10 p-8 md:p-12 border-l border-gray-100 flex flex-col justify-between">
                    <div className="space-y-6">
                        <h3 className="font-bold text-gray-900 text-lg">Transaction Details</h3>

                        <div className="space-y-4">
                            <div className={`bg-white p-4 rounded-xl border shadow-sm ${isSuccess ? 'border-gray-200' : 'border-red-100'}`}>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <p className={`text-sm font-medium ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                                        {isSuccess ? 'Completed' : 'Failed'}
                                    </p>
                                </div>
                            </div>

                            {isSuccess && (
                                <>
                                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Transaction ID</p>
                                        <p className="font-mono text-sm text-gray-900 break-all">{paymentData?.id || 'N/A'}</p>
                                    </div>

                                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Payment Date</p>
                                        <p className="text-sm text-gray-900">
                                            {paymentData?.createdAt ? new Date(paymentData.createdAt).toLocaleString(undefined, {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            }) : 'N/A'}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        {isSuccess && (
                            <PDFDownloadLink
                                document={<ReceiptPDF paymentData={paymentData} />}
                                fileName={`Receipt_${paymentData?.id}.pdf`}
                                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-4 px-6 rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5" />
                                            Download Receipt
                                        </>
                                    )
                                }
                            </PDFDownloadLink>
                        )}

                        <button
                            onClick={() => router.push('/author/')}
                            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-bold py-4 px-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                        >
                            <Home className="w-4 h-4" />
                            Return to Dashboard
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PaymentStatusContent