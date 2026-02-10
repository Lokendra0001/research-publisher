import React from 'react';

const ReviewerSkeleton = ({ count = 3 }) => {
    return (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-sm p-6 shadow-sm bg-white mb-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        {/* Designation */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>

                        {/* University */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>

                        {/* Research Interests */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="h-4 bg-gray-200 rounded w-24 shrink-0"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewerSkeleton;
