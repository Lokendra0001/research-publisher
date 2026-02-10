import React from 'react';
import { Clock, FileText } from 'lucide-react';

const EmptyState = ({
    icon: Icon = Clock,
    title = "No data available",
    description,
    colSpan = "6",
    className = ""
}) => {
    return (

        <tbody className={`${className} `}>
            <tr>
                <td colSpan={colSpan}>
                    <div className=" text-center py-12 text-text-primary/50 bg-gray-50    w-full">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No {title.toLowerCase()} found.</p>
                    </div>
                </td>
            </tr>
        </tbody>

    );
};

export default EmptyState;
