"use client"
import React, { useEffect, useState } from 'react';
import { notify } from '@/utils/toast';
import axios from 'axios';
import { constant } from '@/utils/constant';
import EditorCard from './EditorCard';
import ReviewerSkeleton from '../../common/ReviewerSkeleton';

const AllEditors = () => {
    const [editors, setEditors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEditors = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${constant.SERVER_URL}public/allEditors`);
                if (res.data.status) {
                    setEditors(res.data.editors)
                } else {
                    notify.error(res.data.message)
                }
            } catch (error) {
                notify.error(error.message)
            } finally {
                setLoading(false);
            }
        }

        fetchEditors();
    }, [])

    return (
        <div className="bg-white py-10 ">
            <div className="">

                {/* Main Content Area */}
                <div className="">
                    <h2 className="text-2xl font-bold text-(--primary) border-b-2 border-orange-200 pb-2 mb-6">
                        Editorial Board
                    </h2>

                    {loading ? (
                        <ReviewerSkeleton count={4} />
                    ) : (
                        <div className="space-y-4">
                            {editors.map((editor, index) => (
                                <EditorCard key={index} editor={editor} />
                            ))}
                            {editors.length === 0 && (
                                <div className="text-center py-10 text-gray-500">
                                    No editors found.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllEditors;
