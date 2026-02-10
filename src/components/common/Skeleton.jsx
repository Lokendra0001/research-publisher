import React from 'react';

const Skeleton = ({ count = 5 }) => {
    return (
        <tbody className="w-full animate-pulse">
            {Array.from({ length: count }).map((_, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                    <td className="px-2 py-4 w-14 ">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="px-6 py-4 w-32">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </td>
                    <td className="px-6 py-4 w-40">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4 w-24 text-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto"></div>
                    </td>
                    <td className="px-6 py-4 w-24 text-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full mx-auto"></div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default Skeleton;
