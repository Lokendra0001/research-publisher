
'use client'
import React, { useEffect, useState } from 'react'
import { BadgeIndianRupee } from 'lucide-react'
import { notify } from '@/utils/toast';
import axios from 'axios';
import { constant } from '@/utils/constant';

const SubmissionFee = () => {
    const [fee, setFee] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchFee = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${constant.SERVER_URL}public/submission-fee`, { withCredentials: true });
            if (res.data.success) {
                setFee(res.data.fee?.submissionFee);
            }
        } catch (error) {
            notify.error(error?.response?.data?.message || error?.message || "Failed to fetch fee")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFee();
    }, [])

    const handleSubmit = async () => {
        if (!fee) return;
        setSubmitting(true);
        try {
            const res = await axios.post(`${constant.SERVER_URL}admin/submission-fee`, { fee }, { withCredentials: true });
            if (res.data.success) {
                notify.success(res.data.message)
            }
        } catch (error) {
            notify.error(error?.response?.data?.message || error?.message || "Failed to update fee")

        } finally {
            setSubmitting(false);
        }
    }


    return (
        <div className='md:min-h-screen'>
            <div className='max-w-2xl mx-auto mt-10 p-2 md:p-8 bg-white rounded-lg shadow-sm border border-gray-100 '>
                <div className='flex items-center gap-3 mb-6 border-b border-gray-100 pb-4'>
                    <div className='p-2 bg-secondary/10 rounded-lg'>
                        <BadgeIndianRupee className='w-6 h-6 text-secondary' />
                    </div>
                    <div>
                        <h1 className='text-xl md:text-2xl font-bold text-gray-800'>Submission Fee Settings</h1>
                        <p className='text-xs md:text-sm text-gray-500'>Manage the paper submission fee for authors</p>
                    </div>
                </div>

                {loading ? (
                    <div className='space-y-6'>
                        <div>
                            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                            <div className="h-12 bg-gray-100 rounded-lg w-full animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mt-2 animate-pulse"></div>
                        </div>
                        <div className='flex justify-end pt-4'>
                            <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                        </div>
                    </div>
                ) : (
                    <form className='space-y-6'>
                        <div>
                            <label htmlFor="fee" className='block text-sm font-medium text-gray-700 mb-2'>
                                Current Submission Fee (INR)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">₹</span>
                                </div>
                                <input
                                    type="number"
                                    name="fee"
                                    id="fee"
                                    value={fee}
                                    onChange={(e) => setFee(e.target.value)}
                                    placeholder="0.00"
                                    className='block w-full pl-7 pr-12 py-3 border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary transition-colors duration-200 ease-in-out bg-gray-50 hover:bg-white border'
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">INR</span>
                                </div>
                            </div>
                            <p className='mt-2 text-xs text-gray-500'>
                                This fee will be applicable to all new paper submissions.
                            </p>
                        </div>

                        <div className='flex justify-end pt-4'>
                            <button
                                type='button'
                                disabled={submitting}
                                className={`px-6 py-2.5 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg shadow-lg shadow-secondary/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                onClick={handleSubmit}
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    'Update Fee'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

export default SubmissionFee
