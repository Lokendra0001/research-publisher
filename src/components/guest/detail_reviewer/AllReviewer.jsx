"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '../../common/Sidebar';
import { notify } from '@/utils/toast';
import axios from 'axios';
import { constant } from '@/utils/constant';
import ReviewerCard from './ReviewerCard';


import ReviewerSkeleton from '../../common/ReviewerSkeleton';

const AllReviewer = () => {


    const [reviewers, setReviewers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviewers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${constant.SERVER_URL}public/allReviewers`);
                if (res.data.status) {
                    setReviewers(res.data.reviewers)
                } else {
                    notify.error(res.data.message)
                }
            } catch (error) {
                notify.error(error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchReviewers();
    }, [])

    return (
        <div className="bg-white py-10 min-h-screen">
            <div className="">

                {/* Main Content Area (3 Cols) */}
                <div className="">
                    <h2 className="text-2xl font-bold text-(--primary) border-b-2 border-orange-200 pb-2 mb-6">
                        Reviewers
                    </h2>

                    {loading ? (
                        <ReviewerSkeleton count={4} />
                    ) : (
                        <div className="space-y-4">
                            {reviewers.map((reviewer, index) => (
                                <ReviewerCard key={index} reviewer={reviewer} />
                            ))}
                        </div>
                    )}
                </div>


            </div>
        </div>
    );
};

export default AllReviewer;